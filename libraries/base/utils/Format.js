define( [

], function ( ) {

    return {

        address : function ( address, bits ) {

            var str = address.toString( 16 ).toUpperCase( );

            if ( typeof bits !== 'undefined' )
                while ( str.length < Math.ceil( bits / 4 ) )
                    str = '0' + str;

            return '$' + str;

        },

        hexadecimal : function ( value, bits ) {

            var str = value.toString( 16 ).toUpperCase( );

            if ( typeof bits !== 'undefined' )
                while ( str.length < Math.ceil( bits / 4 ) )
                    str = '0' + str;

            return '0x' + str;

        },

        binary : function ( value, bits ) {

            var str = value.toString( 2 ).toUpperCase( );

            if ( typeof bits !== 'undefined' )
                while ( str.length < bits )
                    str = '0' + str;

            return '0b' + str;

        }

    };

} );
