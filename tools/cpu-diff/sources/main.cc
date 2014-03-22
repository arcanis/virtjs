#include <fstream>
#include <iostream>
#include <vector>

#include <boost/program_options.hpp>

#include "DiffFinder.hh"
#include "Stream.hh"
#include "String.hh"

namespace po = boost::program_options;

int main( int argc, char ** argv ) {

    String dataSource, controlSource;
    std::vector< String > exclusionList;

    auto dataOption    = po::value< String >( & dataSource )->required( );
    auto controlOption = po::value< String >( & controlSource )->required( );
    auto excludeOption = po::value< std::vector< String > >( & exclusionList )->multitoken( );

    po::options_description optionsDescription( "Allowed options" );
    optionsDescription.add_options( )
        ( "data", dataOption, "Data source" )
        ( "control", controlOption, "Control source" )
        ( "exclude,x", excludeOption, "Ignore a set of addresses, separated by commas" )
        ( "help,h", "Print this error message then exit" )
        ;

    po::positional_options_description positionalOptionsDescription;
    positionalOptionsDescription.add( "data", 1 );
    positionalOptionsDescription.add( "control", 1 );

    po::variables_map variableMap;
    po::store( po::command_line_parser( argc, argv )
        .options( optionsDescription )
        .positional( positionalOptionsDescription )
    .run( ), variableMap );

    if ( variableMap.count( "help" ) ) {
        std::cout << optionsDescription;
        return 1;
    }

    try {
        po::notify( variableMap );
    } catch ( po::error & e ) {
        std::cout << optionsDescription;
        return 1;
    }

    std::ifstream realDataStream( dataSource == "-" ? "/dev/stdin" : dataSource );
    std::ifstream realControlStream( controlSource == "-" ? "/dev/stdin" : controlSource );

    Stream dataStream( realDataStream );
    Stream controlStream( realControlStream );

    DiffFinder diffFinder( dataStream, controlStream );
    diffFinder.exclude( exclusionList );
    diffFinder.run( );
}
