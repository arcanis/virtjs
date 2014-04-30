#include <algorithm>
#include <iostream>
#include <sstream>

#include "Block.hh"
#include "DiffBlock.hh"
#include "DiffFinder.hh"
#include "GoodBlock.hh"
#include "PartSet.hh"
#include "colors.hh"

DiffFinder::DiffFinder( Stream & dataStream, Stream & controlStream )
    : SyncSolver( dataStream, controlStream )
{
}

void DiffFinder::desynced( int index, PartSet const & data, PartSet const & control, bool resynced ) {

    if ( resynced ) {

        if ( m_Block )
            std::cout << std::endl;

        std::cout << GREY << "(desync solved)" << NORMAL << std::endl;

    } else {

        std::unique_ptr< DiffBlock > newBlock( new DiffBlock( nullptr ) );

        if ( m_Block ) {
            m_Block->end( false );
            std::cout << std::endl;
        }

        std::cout << DARKRED << "Fatal desync on :" << NORMAL << std::endl;
        std::cout << std::endl;

        m_Block = std::move( newBlock );
        m_Block->begin( );

        std::ostringstream prefixGenerator;
        prefixGenerator << std::setw( 10 ) << index;
        String prefix = prefixGenerator.str( );

        Line line( prefix, data, control );
        m_Block->add( line );

    }

}

void DiffFinder::compare( int index, PartSet const & data, PartSet const & control )
{
    PartSet uncommentedData = data;
    uncommentedData.pop_back( );
    PartSet uncommentedControl = control;
    uncommentedControl.pop_back( );

    bool isSame = data.size( ) == control.size( ) && std::equal( uncommentedData.begin( ), uncommentedData.end( ), uncommentedControl.begin( ) );

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
