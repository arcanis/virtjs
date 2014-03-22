#pragma once

#include <iomanip>
#include <iostream>
#include <memory>

#include "Block.hh"
#include "SyncSolver.hh"

class DiffFinder : public SyncSolver {

public:

                             DiffFinder  ( Stream & dataStream, Stream & controlStream );

protected:

                virtual void compare     ( int index, PartSet const & data, PartSet const & control );
                virtual void close       ( void );

private:

                        template < typename T >
                        void ensureBlock ( void );

private:

    std::unique_ptr< Block > m_Block;

};

template < typename T >
void DiffFinder::ensureBlock( void )
{
    if ( dynamic_cast< T * >( m_Block.get( ) ) )
        return ;

    std::unique_ptr< Block > newBlock( new T( m_Block.get( ) ) );

    if ( m_Block.get( ) ) {
        m_Block->end( false );
        std::cout << std::endl;
    }

    m_Block = std::move( newBlock );
    m_Block->begin( );
}
