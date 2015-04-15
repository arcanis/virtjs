export class AggregateInput {

    constructor( ) {

        this._inputs = [ ];

    }

    addSource( input ) {

        if ( this._inputs.includes( input ) )
            return ;

        this._inputs.push( input );

    }

    removeSource( input ) {

        let index = this._inputs.indexOf( input );
        this._inputs.splice( index, 1 );

    }

    pollInputs( ) {

        for ( let input of this._inputs ) {
            input.pollInputs( );
        }

    }

    getState( port, inputCode ) {

        for ( let input of this._inputs )
            if ( input.getState( port, inputCode ) )
                return true;

        return false;

    }

}
