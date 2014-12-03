import { EmitterMixin } from '../../mixins/EmitterMixin';
import { mixin }        from '../../utils/ObjectUtils';

export class ButtonInput extends mixin( null, EmitterMixin ) {

    constructor( options = { } ) {

        this._code = options.code;
        this._element = options.element || document.body;

        this._onMouseDown_ = this._onMouseDown.bind( this );
        this._onMouseUp_ = this._onMouseUp.bind( this );

        this._attach( );

    }

    destroy( ) {

        this._detach( );

    }

    _attach( ) {

        if ( ! this._code )
            return ;

        this._element.addEventListener( 'mousedown', this._onMouseDown_ );
        this._element.addEventListener( 'mouseup', this._onMouseUp_ );

    }

    _detach( ) {

        if ( ! this._code )
            return ;

        this._element.removeEventListener( 'mousedown', this._onMouseDown_ );
        this._element.removeEventListener( 'mouseup', this._onMouseUp_ );

    }

    _onMouseDown( ) {

        this.emit( 'keydown', this._code );

    }

    _onMouseUp( ) {

        if ( typeof this._options.code === 'undefined' )
            return ;

        this.emit( 'keyup', this._code );

    }

};
