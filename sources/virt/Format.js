define( [

], function ( ) {

    return {

        address : function ( address, size ) {

            var str = address.toString( 16 ).toUpperCase( );

            if ( typeof size !== 'undefined' )
                while ( str.length < size * 2 )
                    str = '0' + str;

            return '$' + str;

        },

        hexadecimal : function ( value, size ) {

            var str = value.toString( 16 ).toUpperCase( );

            if ( typeof size !== 'undefined' )
                while ( str.length < size * 2 )
                    str = '0' + str;

            return '0x' + str;

        }

    };

} );
