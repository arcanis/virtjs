define( [

], function ( ) {

    return {

        extend : function ( ) {

            var first = arguments[ 0 ];

            for ( var t = 1, T = arguments.length; t < T; ++ t ) {

                var argument = arguments[ t ];
                if ( argument == null ) continue ;

                Object.keys( argument ).forEach( function ( key ) {
                    first[ key ] = argument[ key ];
                } );

            }

            return first;

        }

    };

} );
