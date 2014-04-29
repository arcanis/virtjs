define( [

], function ( ) {

    var Esprima   = typeof window !== 'undefined' ? window.esprima : require( 'esprima' );
    var Escodegen = typeof window !== 'undefined' ? window.escodegen : require( 'escodegen' );

    var executePreprocessing = function ( preprocess, root ) {

        return findBranches( root, function ( node ) {

            if ( ! usesPreprocessVariable( node.test ) )
                return node;

            if ( usesUndeclaredVariables( node.test, [ 'this', 'arguments', 'preprocess' ] ) )
                throw new Error( 'Preprocessed branches cannot access other variables than `preprocess`' );

            var test = Escodegen.generate( node.test );
            var branch = eval( test ) ? node.consequent : node.alternate;

            return executePreprocessing( preprocess, branch || { type : 'EmptyStatement' } );

        } );

    };

    var findBranches = function ( node, callback ) {

        if ( node.type === 'IfStatement' )
            node = callback( node );

        Object.keys( node ).forEach( function ( key ) {

            var property = node[ key ];

            if ( typeof property !== 'object' || property === null )
                return ;

            if ( ! Array.isArray( property ) ) {
                node[ key ] = findBranches( property, callback );
                return ;
            }

            property.forEach( function ( node, index ) {
                property[ index ] = findBranches( node, callback );
            } );

        } );

        return node;

    };

    var usesPreprocessVariable = function ( node ) {

        if ( node.type === 'Identifier' && node.name === 'preprocess' )
            return true;

        if ( node.type === 'MemberExpression' )
            return false;

        return Object.keys( node ).some( function ( key ) {

            var property = node[ key ];

            if ( typeof property !== 'object' || property === null )
                return false;

            if ( ! Array.isArray( property ) )
                return usesPreprocessVariable( property );

            return property.some( function ( node ) {
                return usesPreprocessVariable( node );
            } );

        } );

    };

    var usesUndeclaredVariables = function ( node, allowed ) {

        // This test should be implemented. It is not required strictly speaking, but would help preventing stupid mistakes.

        return false;

    };

    var isVariable = function ( name ) {
        return function ( node ) {
            return node.type === 'Identifier' && node.name === name; }; };

    var validatesWhitelist = function ( whitelist ) {
        return function ( node ) {
            return node.type !== 'Identifier' || whitelist.indexOf( node.name ) !== - 1; }; };

    return {

        monitorFunction : function ( /* ( instance, member | function ), callback */ ) {

            if ( typeof arguments[ 1 ] === 'function' ) {

                var fn = arguments[ 0 ];
                var callback = arguments[ 1 ];

            } else {

                var instance = arguments[ 0 ];
                var method = arguments[ 1 ];

                var fn = instance[ method ];
                var callback = arguments[ 2 ];

            }

            if ( typeof callback === 'undefined' ) {
                callback = function ( calledByNew, instance, args ) {
                    var verb = calledByNew ? 'instancied' : 'called';
                    var argString = JSON.stringify( Array.prototype.slice.call( args ) );
                    console.trace( 'Monitored function "' + ( method || fn.name ) + '" ' + verb + ' with arguments ' + argString );
                };
            }

            var trap = function ( ) {

                var calledByNew = this instanceof trap;

                if ( callback )
                    callback( calledByNew, this, arguments );

                if ( ! calledByNew ) {
                    return fn.apply( this, arguments );
                } else {
                    var bindArguments = [ null ].concat( Array.prototype.slice.call( arguments ) );
                    var bindedConstructor = Function.prototype.bind.apply( fn, bindArguments );
                    return new bindedConstructor( );
                }

            };

            trap.drop = function ( ) {
                callback = null;
            };

            if ( instance )
                instance[ method ] = trap;

            return trap;

        },

        preprocessFunction : function ( /* ( instance, member | function ), preprocess */ ) {

            if ( arguments.length <= 2 ) {

                var fn         = arguments[ 0 ];
                var preprocess = arguments[ 1 ];

            } else {

                var instance   = arguments[ 0 ];
                var method     = arguments[ 1 ];

                var fn         = instance[ method ];
                var preprocess = arguments[ 2 ];

            }

            var ast = Esprima.parse( '(' + fn.toString( ) + ')' );

            if ( usesUndeclaredVariables( ast ) )
                throw new Error( 'Preprocessed functions cannot make use of non-local variables' );

            var newFn = eval( ( instance ? 'instance.' + method + ' = ' : '' ) + Escodegen.generate( executePreprocessing( preprocess, ast ) ) );

            return newFn;

        }

    };

} );
