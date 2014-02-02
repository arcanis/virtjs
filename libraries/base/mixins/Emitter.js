define( [

], function ( ) {

    return {

        on : function ( event, callback ) {

            if ( typeof this._listeners === 'undefined' )
                this._listeners = { };
            if ( typeof this._listeners[ event ] === 'undefined' )
                this._listeners[ event ] = [ ];

            this._listeners[ event ].push( callback );

        },

        off : function ( event, callback ) {

            if ( typeof this._listeners === 'undefined' )
                return ;
            if ( typeof this._listeners[ event ] === 'undefined' )
                return ;

            var index = this._listeners[ event ].indexOf( callback );
            this._listeners[ event ].splice( index, 1 );

        },

        emit : function ( event, data ) {

            if ( typeof this._listeners === 'undefined' )
                return ;
            if ( typeof this._listeners[ event ] === 'undefined' )
                return ;

            this._listeners[ event ].forEach( function ( callback ) {
                callback( data );
            } );

        }

    };

} );
