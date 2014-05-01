var AsmforTag = module.exports = function ( ) {

};

AsmforTag.prototype.parse = function ( string, line, parser, types, stack, options ) {

    var standardStates = [ [ types.VAR, types.STRING ], types.COMMA, types.VAR ];
    var dumpStates     = [ types.VAR ];

    var standardParameters = [ ];
    var dumpParameters     = [ ];

    var index = 0;

    var monitor = function ( type ) {
        parser.on( type, function ( token ) {

            var currentIndex = index ++;

            var matchStandard = [ ].concat( standardStates[ currentIndex ] ).indexOf( type ) !== - 1;
            var matchDump     = [ ].concat( dumpStates[ currentIndex ] ).indexOf( type ) !== - 1;

            if ( ! matchStandard && ! matchDump )
                throw new Error( 'Unexpected token "' + token.match + '" on line ' + line );

            if ( matchStandard ) {
                if ( type === types.VAR ) {
                    standardParameters.push( '_ctx.' + token.match );
                } else {
                    standardParameters.push( token.match );
                }
            }

            if ( matchDump )
                dumpParameters.push( null );

            return undefined;

        } );
    };

    parser.on( 'end', function ( ) {

        if ( standardParameters.length === standardStates.length ) {

            this.out.push( 'standard' );

            this.out.push( standardParameters[ 0 ] );
            this.out.push( standardParameters[ 2 ] );

        } else if ( dumpParameters.length === dumpStates.length ) {

            this.out.push( 'dump' );

        }

    } );

    monitor( types.VAR );
    monitor( types.STRING );
    monitor( types.COMMA );
    monitor( types.NUMBER );

    return true;

};

AsmforTag.prototype.compile = function ( compiler, args, content, parents, options, blockName ) {

    var source = this[ '_' + args[ 0 ] ].toString( );
    var parameters = '[' + args.slice( 1 ) + ']';
    var block = JSON.stringify( compiler( content, parents, options, blockName ) );

    return '(' + source + ')(' + parameters + ',' + block + ');';

};

var _ctx, _output;

AsmforTag.prototype._standard = function ( args, block ) {

    var target = args[ 0 ];
    var values = args[ 1 ];

    var key = JSON.stringify( [ target, values ] );

    if ( ! _ctx._asmfor_node )
        _ctx._asmfor_node = { children : { } };
    var parent = _ctx._asmfor_node;

    if ( ! parent.children[ key ] )
        parent.children[ key ] = { name : args[ 0 ], blocks : [ ], children : { } };
    var node = _ctx._asmfor_node = parent.children[ key ];

    var _output = '';
    eval( block );

    node.blocks.push( _output );

    _ctx._asmfor_node = parent;

};

AsmforTag.prototype._dump = function ( args, block ) {

    if ( ! _ctx._asmfor_node )
        return ;

    var traverse = function ( nodes, flatten ) {
        Object.keys( nodes ).forEach( function ( key ) {
            var definition = JSON.parse( key ), node = nodes[ key ];
            definition[ 1 ].forEach( function ( value ) {

                _output += _ctx.asmfor_init( definition[ 0 ], value );

                node.blocks.forEach( function ( block ) {
                    _output += block;
                } );

                traverse( node.children, flatten );

            } );
        } );
    };

    traverse( _ctx._asmfor_node.children, false );

};
