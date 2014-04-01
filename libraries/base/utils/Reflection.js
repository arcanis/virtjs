define( [

], function ( ) {

    return {

        // This function change the scope of another function (the affected function will lost its previous scope and gain a new one)

        resetScope : function ( /* ( reflectionInstance, reflectionMember )? ( reflectionFunction )? reflectionNewScope */ ) {

            var reflectionInstance, reflectionMember,
                reflectionFunction, reflectionNewScope;

            if ( arguments.length <= 2 ) {

                reflectionFunction = arguments[ 0 ];
                reflectionNewScope = arguments[ 1 ];

            } else if ( arguments.length <= 3 ) {

                reflectionInstance = arguments[ 0 ];
                reflectionMember = arguments[ 1 ];
                reflectionFunction = arguments[ 0 ][ arguments[ 1 ] ];
                reflectionNewScope = arguments[ 2 ];

            } else if ( arguments.length <= 4 ) {

                reflectionInstance = arguments[ 0 ];
                reflectionMember = arguments[ 1 ];
                reflectionFunction = arguments[ 2 ];
                reflectionNewScope = arguments[ 3 ];

            }

            if ( Object.keys( reflectionNewScope ).length ) {
                eval( 'var ' +  Object.keys( reflectionNewScope ).map( function ( variable ) {
                    return variable + ' = reflectionNewScope.' + variable;
                } ).join( ',' ) + ';' );
            }

            return eval( ( reflectionInstance ? 'reflectionInstance.' + reflectionMember + ' = ' : '' ) + '(' + reflectionFunction.toString( ) + ')' );

        }

    };

} );
