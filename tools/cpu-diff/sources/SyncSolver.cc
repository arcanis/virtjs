#include <algorithm>
#include <memory>
#include <set>

#include <boost/algorithm/string/classification.hpp>
#include <boost/algorithm/string/split.hpp>
#include <boost/algorithm/string/trim.hpp>

#include "PartSet.hh"
#include "Stream.hh"
#include "String.hh"
#include "SyncInfo.hh"
#include "SyncSolver.hh"

#define IS_SYNC_RESOLVED_STRICT( a, b )   std::equal( ( a ).begin( ), ( a ).end( ), ( b ).begin( ) )
#define IS_SYNC_RESOLVED_FLEXIBLE( a, b ) ( ( a )[ 0 ] == ( b )[ 0 ] )

#define IS_SYNC_RESOLVED( a, b ) IS_SYNC_RESOLVED_STRICT( a, b )

SyncSolver::SyncSolver( Stream & data, Stream & control )
    : m_LineIndex( 0 )
    , m_DataStream( data )
    , m_ControlStream( control )
{
}

bool SyncSolver::readParts( Stream & stream, PartSet & destination )
{
fetchLine:

    String line, comment;

    if ( ! stream.readLine( line ) )
        return false;

    auto commentOffset = line.find_first_of( "#" );
    if ( commentOffset != String::npos ) {
        comment = line.substr( commentOffset );
        line = line.substr( 0, commentOffset );
    }

    boost::trim( line );
    boost::trim( comment );

    if ( line.empty( ) )
        goto fetchLine;

    boost::algorithm::split( destination, line, boost::algorithm::is_any_of( " " ) );

    if ( std::find( m_ExclusionList.begin( ), m_ExclusionList.end( ), destination[ 1 ] ) != m_ExclusionList.end( ) )
        goto fetchLine;

    destination.push_back( comment );

    return true;
}

bool SyncSolver::readBufferedParts( std::list< PartSet > & buffer, Stream & stream, PartSet & destination )
{
    if ( buffer.empty( ) )
        return this->readParts( stream, destination );

    destination = buffer.front( );
    buffer.pop_front( );
    return true;
}

void SyncSolver::exclude( std::vector< String > const & exclusionList )
{
    m_ExclusionList.insert( m_ExclusionList.end( ), exclusionList.begin( ), exclusionList.end( ) );
}

void SyncSolver::run( void )
{
    while ( this->next( ) ) ;
}

bool SyncSolver::next( void )
{
    PartSet data, control;
    bool dataOk, controlOk;

    dataOk = this->readBufferedParts( m_DataBuffer, m_DataStream, data );
    controlOk = this->readBufferedParts( m_ControlBuffer, m_ControlStream, control );

    if ( ! dataOk || ! controlOk ) {
        this->close( );
        return false;
    }

    m_LineIndex += 1;

    if ( data[ 1 ] != control[ 1 ] ) {

        if ( ! this->resync( ) ) {

            this->desynced( m_LineIndex, data, control, false );
            this->close( );

            return false;

        } else {

            this->desynced( m_LineIndex, data, control, true );

        }

    } else {

        this->compare( m_LineIndex, data, control );

    }

    return true;
}

bool SyncSolver::resync( void )
{
    std::set< String > jumps;

    std::unique_ptr< SyncInfo > dataSync = this->getSyncInfo( m_DataBuffer, m_ControlBuffer );
    std::unique_ptr< SyncInfo > controlSync = this->getSyncInfo( m_ControlBuffer, m_DataBuffer );

    if ( ! dataSync.get( ) )
        dataSync = this->fetchSyncInfo( m_DataBuffer, m_DataStream, m_ControlBuffer, m_ControlStream );

    if ( ! controlSync.get( ) )
        controlSync = this->fetchSyncInfo( m_ControlBuffer, m_ControlStream, m_DataBuffer, m_DataStream );

    if ( controlSync.get( ) ) {
        auto temporary = controlSync->aOffset;
        controlSync->aOffset = controlSync->bOffset;
        controlSync->bOffset = temporary;
    }

    if ( ! dataSync.get( ) && ! controlSync.get( ) )
        return false;

    std::unique_ptr< SyncInfo > sync;

    if ( ! controlSync.get( ) ) {
        sync = std::move( dataSync );
    } else if ( ! dataSync.get( ) ) {
        sync = std::move( controlSync );
    } else {
        sync = std::move( dataSync->weight < controlSync->weight ? dataSync : controlSync );
    }

    m_LineIndex += sync->aOffset;

    for ( ; sync->aOffset > 0; -- sync->aOffset )
        m_DataBuffer.pop_front( );

    for ( ; sync->bOffset > 0; -- sync->bOffset )
        m_ControlBuffer.pop_front( );

    return true;
}

std::unique_ptr< SyncInfo > SyncSolver::getSyncInfo( std::list< PartSet > const & a, std::list< PartSet > const & b ) const
{
    std::set< String > jumps;

    auto aIt = a.begin( );
    for ( int aNum = 0, aLen = a.size( ); aNum < aLen; ++ aNum ) {

        auto bIt = b.begin( );
        for ( int bNum = 0, bLen = b.size( ); bNum < bLen; ++ bNum ) {

            if ( aIt->size( ) == bIt->size( ) && IS_SYNC_RESOLVED( * aIt, * bIt ) ) {
                return std::unique_ptr< SyncInfo >( new SyncInfo( jumps.size( ), aNum, bNum ) );
            } else {
                jumps.insert( ( * aIt )[ 1 ] );
            }

        }

    }

    return std::unique_ptr< SyncInfo >( nullptr );
}

std::unique_ptr< SyncInfo > SyncSolver::fetchSyncInfo( std::list< PartSet > & aBuffer, Stream & aStream, std::list< PartSet > & bBuffer, Stream & bStream )
{
    auto aIt = aBuffer.end( );
    auto bIt = bBuffer.begin( );

    std::set< String > globalJumps;

    bool aIsFinished = false;
    bool bIsFinished = false;

    char which = 1;

    while ( ! aIsFinished || ! bIsFinished ) {

        PartSet parts;
        which = ! which;

        if ( bIsFinished || which == 0 )
            goto partA;
        if ( aIsFinished || which == 1 )
            goto partB;

        partA: {

            if ( ! this->readParts( aStream, parts ) ) {
                aIsFinished = true;
                continue ;
            }

            aBuffer.push_back( parts );

            auto bIt = bBuffer.begin( );
            for ( int bNum = 0, bLen = bBuffer.size( ); bNum < bLen; ++ bNum ) {
                if ( parts.size( ) == bIt->size( ) && IS_SYNC_RESOLVED( parts, * bIt ) ) {
                    return std::unique_ptr< SyncInfo >( new SyncInfo( globalJumps.size( ), aBuffer.size( ) - 1, bNum ) );
                } else {
                    globalJumps.insert( parts[ 1 ] );
                }
            }

        } continue ;

        partB: {

            if ( ! this->readParts( bStream, parts ) ) {
                bIsFinished = true;
                continue ;
            }

            bBuffer.push_back( parts );

            std::set< String > jumps;

            auto aIt = aBuffer.begin( );
            for ( int aNum = 0, aLen = aBuffer.size( ); aNum < aLen; ++ aNum ) {
                if ( aIt->size( ) == parts.size( ) && IS_SYNC_RESOLVED( * aIt, parts ) ) {
                    return std::unique_ptr< SyncInfo >( new SyncInfo( jumps.size( ), aNum, bBuffer.size( ) - 1 ) );
                } else {
                    jumps.insert( parts[ 1 ] );
                }
            }

        } continue ;

    }

    return std::unique_ptr< SyncInfo >( );

}
