#include <algorithm>
#include <iostream>
#include <sstream>

#include "Block.hh"
#include "DiffBlock.hh"
#include "DiffFinder.hh"
#include "GoodBlock.hh"
#include "PartSet.hh"

DiffFinder::DiffFinder( Stream & dataStream, Stream & controlStream )
    : SyncSolver( dataStream, controlStream )
{
}

void DiffFinder::compare( int index, PartSet const & data, PartSet const & control )
{
    bool isSame = data.size( ) == control.size( ) && std::equal( data.begin( ), data.end( ), control.begin( ) );

    std::ostringstream prefixGenerator;
    prefixGenerator << std::setw( 10 ) << index;
    String prefix = prefixGenerator.str( );

    Line line( prefix, data, control );

    if ( isSame ) {
        this->ensureBlock< GoodBlock >( );
    } else {
        this->ensureBlock< DiffBlock >( );
    }

    m_Block->add( line );
}

void DiffFinder::close( void )
{
    if ( m_Block.get( ) ) {
        m_Block->end( true );
    }
}
