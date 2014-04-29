#include "Block.hh"
#include "Line.hh"
#include <iostream>

Block::Block( void )
{
    m_Mode = PRINT;
}

void Block::add( Line const & line )
{
    switch ( m_Mode ) {

        case PRINT :
            this->print( line );
        break ;

        case BUFFER :
            m_Buffer.push_back( line );
        break ;

    }
}
