#include <boost/algorithm/string/join.hpp>

#include "GoodBlock.hh"
#include "colors.hh"

GoodBlock::GoodBlock( Block * previous )
{
    m_Mode = ! previous ? PRINT : BUFFER;

    m_IsLinePrinted = false;
}

void GoodBlock::print( Line const & line )
{
    String linestr = boost::algorithm::join( GET_DATA( line ), " " );

    std::cout << GET_PREFIX( line ) << " " << linestr << std::endl;

    m_IsLinePrinted = true;

    m_Mode = BUFFER;
}

void GoodBlock::end( bool isLast )
{
    if ( isLast ) {

        if ( m_Buffer.size( ) > 1 && m_IsLinePrinted )
            std::cout << std::endl;

        if ( m_Buffer.size( ) > 1 ) {
            String s = m_Buffer.size( ) == 2 ? "" : "s";
            std::cout << GREY << "(follow " << ( m_Buffer.size( ) - 1 ) << " correct line" << s << ")" << NORMAL << std::endl;
            std::cout << std::endl;
        }

        if ( m_Buffer.size( ) > 0 ) {
            String linestr = boost::algorithm::join( GET_DATA( m_Buffer.back( ) ), " " );
            std::cout << GET_PREFIX( m_Buffer.back( ) ) << " " << linestr << std::endl;
        }

    } else {

        if ( m_Buffer.size( ) > 0 && m_IsLinePrinted )
            std::cout << std::endl;

        if ( m_Buffer.size( ) > 0 ) {
            String s = m_Buffer.size( ) == 1 ? "" : "s";
            std::cout << GREY << "(follow " << m_Buffer.size( ) << " correct line" << s << ")" << NORMAL << std::endl;
        }

    }
}
