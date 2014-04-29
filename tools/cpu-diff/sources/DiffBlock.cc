#include <boost/algorithm/string/join.hpp>

#include "DiffBlock.hh"
#include "colors.hh"

DiffBlock::DiffBlock( Block * previous )
{
    if ( previous && previous->m_Buffer.size( ) > 0 ) {
        m_StolenLine.reset( new Line( previous->m_Buffer.back( ) ) );
        previous->m_Buffer.pop_back( );
    }

    m_StoredPrefix = "";
}

void DiffBlock::print( Line const & line )
{
    m_StoredPrefix = GET_PREFIX( line );

    if ( m_StolenLine.get( ) ) {
        String linestr = boost::algorithm::join( GET_DATA( * m_StolenLine ), " " );
        std::cout << GET_PREFIX( * m_StolenLine ) << " " << linestr << std::endl;
    }

    String const & prefix = GET_PREFIX( line );
    String emptyPrefix = String( prefix.length( ), ' ' );

    PartSet const & data = GET_DATA( line );
    PartSet const & control = GET_CONTROL( line );

    this->printDiff( prefix, data, control, RED );
    this->printDiff( emptyPrefix, control, data, GREEN );

    m_Mode = BUFFER;
}

void DiffBlock::printDiff( String const & prefix, PartSet const & data, PartSet const & control, String const & color ) const
{
    PartSet coloredData;

    auto dataIt = data.begin( );
    auto controlIt = control.begin( );

    while ( dataIt != data.end( ) ) {

        if ( controlIt == control.end( ) || * dataIt != * controlIt ) {
            coloredData.push_back( color + * dataIt + NORMAL );
        } else {
            coloredData.push_back( * dataIt );
        }

        ++ dataIt;

        if ( controlIt != control.end( ) ) {
            ++ controlIt;
        }

    }

    String linestr = boost::algorithm::join( coloredData, " " );
    std::cout << prefix << " " << linestr << std::endl;
}

void DiffBlock::end( bool isLast )
{
    if ( m_Buffer.size( ) ) {
        String padding = m_StoredPrefix.substr( 0, m_StoredPrefix.find_first_not_of( ' ' ) );

        String s = m_Buffer.size( ) == 1 ? "" : "s";
        std::cout << DARKRED << padding << "and " << m_Buffer.size( ) << " more different" << s << " lines" << NORMAL << std::endl;
    }
}
