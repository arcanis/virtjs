define( [

], function ( ) {

    return {

        decimal : function ( value, length ) {

            var str = value.toString( 10 );

            if ( typeof length !== 'undefined' )
                while ( str.length < length )
                    str = '0' + str;

            return str;

        },

        address : function ( address, bits ) {

            var str = address.toString( 16 ).toLowerCase( );

            if ( typeof bits !== 'undefined' )
                while ( str.length < Math.ceil( bits / 4 ) )
                    str = '0' + str;

            return '$' + str;

        },

        hexadecimal : function ( value, bits ) {

            var str = value.toString( 16 ).toLowerCase( );

            if ( typeof bits !== 'undefined' )
                while ( str.length < Math.ceil( bits / 4 ) )
                    str = '0' + str;

            return '0x' + str;

        },

        binary : function ( value, bits ) {

            var str = value.toString( 2 );

            if ( typeof bits !== 'undefined' )
                while ( str.length < bits )
                    str = '0' + str;

            return '0b' + str;

        }

    };

} );
