export class RunnableMixin {

    constructor( ) {

        this._runTimer = null;

    }

    run( ) {

        if ( this._runTimer )
            return ;

        if ( ! this._canStart( ) )
            return ;

        this._start( );

    }

}
