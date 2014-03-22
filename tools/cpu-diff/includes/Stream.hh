#pragma once

#include <iostream>

#include "String.hh"

class Stream {

public:

    Stream( std::istream & stream );

public:

    bool ok( void ) const;

public:

    bool readLine( String & string );

private:

    String m_Data;
    String::size_type m_DataOffset;

};
