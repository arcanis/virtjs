import { EmitterMixin } from '../../mixins/EmitterMixin';
import { mixin }        from '../../utils/ObjectUtils';

export class MixedInput extends mixin( null, EmitterMixin ) {

    constructor( inputs = [ ] ) {

        this._inputs = inputs;

        this._onEmit_ = this._onEmit.bind( this );

        this._attach( );

    }

    destroy( ) {

        this._detach( );

    }

    _attach( ) {

        this._inputs.forEach( input => {
            input.on( '*', this._onEmit );
        } );

    }

    _detach( ) {

        this._inputs.forEach( input => {
            input.destroy( );
        } );

    }

    _onEmit( type, e ) {

        this.emit( type, e );

    }

};
