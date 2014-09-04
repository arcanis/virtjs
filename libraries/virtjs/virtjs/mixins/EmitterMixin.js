export class EmitterMixin {

    constructor( ) {

        this._listeners = { '*' : [ ] };

    }

    on( event, callback, context ) {

        if ( typeof this._listeners[ event ] === 'undefined' )
            this._listeners[ event ] = [ ];

        this._listeners[ event ].push( [ callback, context ] );

    }

    off( event, callback, context ) {

        if ( typeof this._listeners[ event ] === 'undefined' )
            return ;

        var listeners = this._listeners[ event ];

        for ( var t = 0, T = listeners.length; t < T; ++ t )
            if ( listeners[ t ][ 0 ] === callback && listeners[ t ][ 1 ] === context )
                break ;

        listeners.splice( listeners.findIndex( ( [ lCallback, lContext ] ) => {
            return lCallback === callback && lContext === context;
        } ), 1 );

    }

    emit( event, data ) {

        if ( typeof this._listeners[ event ] === 'undefined' )
            return ;

        this._listeners[ event ].forEach( ( [ callback, context ] ) => {
            callback.call( context, data );
        } );

        this._listeners[ '*' ].forEach( ( [ callback, context ] ) => {
            callback.call( context, event, data );
        } );

    }

};
