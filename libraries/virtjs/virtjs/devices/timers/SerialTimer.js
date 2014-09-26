export class SerialTimer {

    constructor( ) {

        this._actions = [ ];

    }

    nextTick( callback ) {

        this._actions.push( callback );

        return callback;

    }

    cancelTick( marker ) {

        var index = this._aactions.indexOf( marker );

        if ( index === -1 )
            return ;

        this._actions.splice( index, 1 );

    }

    tick( count = 1 ) {

        for ( ; count; -- count ) {

            var actions = this._actions;
            this._actions = [ ];

            for ( var action of actions ) {
                action( );
            }

        }

        return this;

    }

}
