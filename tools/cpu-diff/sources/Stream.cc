#include <iostream>

#include "Stream.hh"
#include "String.hh"

Stream::Stream( std::istream & stream )
    : m_Data( )
    , m_DataOffset( 0 )
{
    char buffer[ 4096 ];

    while ( stream.read( buffer, sizeof( buffer ) ) )
        m_Data.append( buffer, sizeof( buffer ) );

    m_Data.append( buffer, stream.gcount( ) );
}

bool Stream::readLine( String & string )
{
    if ( m_Data.empty( ) || m_DataOffset == String::npos )
        return false;

    String::size_type startOffset = m_DataOffset;
    m_DataOffset = m_Data.find_first_of( "\n", startOffset );

    if ( m_DataOffset == String::npos ) {
        string = m_Data.substr( startOffset );
    } else {
        m_DataOffset += 1;
        string = m_Data.substr( startOffset, m_DataOffset - startOffset - 1 );
    }

    return true;
}
