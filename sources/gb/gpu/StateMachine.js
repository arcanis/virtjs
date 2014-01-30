define( [

], function ( ) {

    var StateMachine = function ( gpu ) {

        this._gpu = gpu;

        this._clock = 0;
        this._line = 0;

        this._state = this._hblank;

    };

    StateMachine.prototype.step = function ( cycles ) {

        this._clock += cycles;

        this._state( );

    };

    // Mode 0 : HBlank
    StateMachine.prototype._hblank = function ( ) {

        if ( this._clock < 204 )
            return ;

        this._gpu._hblank( this._line );

        this._clock = 0;
        this._line += 1;

        if ( this._line < 143 ) {

            this._state = this._oam;

        } else {

            this._state = this._vblank;

        }

    };

    // Mode 1 : VBlank
    StateMachine.prototype._vblank = function ( ) {

        if ( this._clock < 456 )
            return ;

        this._clock = 0;
        this._line += 1;

        if ( this._line < 154 )
            return ;

        this._line = 0;
        this._gpu._vblank( );

        this._state = this._oam;

    };

    // Mode 2 : OAM
    StateMachine.prototype._oam = function ( ) {

        if ( this._clock < 80 )
            return ;

        this._clock = 0;

        this._state = this._vram;

    };

    // Mode 3 : VRAM
    StateMachine.prototype._vram = function ( ) {

        if ( this._clock < 172 )
            return ;

        this._clock = 0;

        this._state = this._hblank;

    };

    return StateMachine;

} );
