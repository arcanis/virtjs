define( [

], function ( ) {

    var Engine = function ( options ) {

        this._options = options;

    };

    Engine.prototype.initialize = function ( ) {

        this._memory = new Uint8Array( 4096 );
        this._memoryView = new DataView( this._memory.buffer );
        this._registers = new Uint8Array( 16 );

        this._index = new Uint16Array( 1 );
        this._pc = new Uint16Array( 1 );

        this._gfx = new Uint8Array( 64 * 32 );

        this._delay = new Uint8Array( 1 );
        this._sound = new Uint8Array( 1 );

        this._stack = new Uint16Array( 16 );
        this._sp = new Uint16Array( 1 );

        this._keys = new Uint8Array( 16 );
        this._keys.timers = { };

        this._options.screen.setSize( 64, 32 );

        this._options.keyboard.setCharacterCallback( this._onCharacterCallback.bind( this ) );

        this._waitForKey = false;

    };

    Engine.prototype.load = function ( buffer ) {

        this._pc[ 0 ] = 0x200;

        var data = new Uint8Array( buffer );
        for ( var t = 0, T = data.length; t < T; ++ t )
            this._memory[ this._pc[ 0 ] + t ] += data[ t ];

        this._importFont( );

    };

    Engine.prototype.cycle = function ( ) {

        if ( this._pc[ 0 ] === this.last )
            throw 0;
        this.last = this._pc[ 0 ];

        var opcode = this._memoryView.getUint16( this._pc[ 0 ] );
        var family = opcode >> 12;

        window.foo = window.foo || { };
        window.foo[family] = 1;

        switch ( family ) {

            case 0x0 :

                switch ( opcode ) {

                    case 0x00E0 : // Clears the screen.

                        for ( var u = 0; u < 64; ++ u ) {
                            for ( var v = 0; v < 32; ++ v ) {

                                var i = v * 64 + u;

                                if ( this._gfx[ i ] === 0 )
                                    continue ;

                                this._options.screen.setPixel( u, v, 0x000000 );
                                this._gfx[ i ] = 0;

                            }
                        }

                        this._pc[ 0 ] += 2;

                    return;

                    case 0x00EE : // Returns from a subroutine.

                        this._pc[ 0 ] = this._stack[ this._sp[ 0 ] - 1 ];
                        this._sp[ 0 ] -= 1;

                    return;

                    default : // Calls RCA 1802 program at address NNN.

                        var nnn = ( opcode & 0x0FFF ) >> 8;

                    return;

                }

            return ;

            case 0x1 : // Jumps to address NNN.

                var nnn = ( opcode & 0x0FFF ) >> 0;

                this._pc[ 0 ] = nnn;

            return ;

            case 0x2 : // Calls subroutine at NNN.

                var nnn = ( opcode & 0x0FFF ) >> 0;

                this._stack[ this._sp[ 0 ] ] = this._pc[ 0 ] + 2;
                this._sp[ 0 ] += 1;
                this._pc[ 0 ] = nnn;

            return ;

            case 0x3 : // Skips the next instruction if VX equals NN.

                var x = ( opcode & 0x0F00 ) >> 8;
                var nn = ( opcode & 0x00FF ) >> 0;

                this._pc[ 0 ] += this._registers[ x ] === nn ? 4 : 2;

            return ;

            case 0x4 : // Skips the next instruction if VX doesn't equal NN.

                var x = ( opcode & 0x0F00 ) >> 8;
                var nn = ( opcode & 0x00FF ) >> 0;

                this._pc[ 0 ] += this._registers[ x ] !== nn ? 4 : 2;

            return ;

            case 0x5 : // Skips the next instruction if VX equals VY.

                var x = ( opcode & 0x0F00 ) >> 8;
                var y = ( opcode & 0x00F0 ) >> 4;

                this._pc[ 0 ] += this._registers[ x ] === this._registers[ y ] ? 4 : 2;

            return ;

            case 0x6 : // Sets VX to NN.

                var x = ( opcode & 0x0F00 ) >> 8;
                var nn = ( opcode & 0x00FF ) >> 0;

                this._registers[ x ] = nn;

                this._pc[ 0 ] += 2;

            return ;

            case 0x7 : // Adds NN to VX.

                var x = ( opcode & 0x0F00 ) >> 8;
                var nn = ( opcode & 0x00FF ) >> 0;

                this._registers[ x ] += nn;

                this._pc[ 0 ] += 2;

            return ;

            case 0x8 :

                var subtype = opcode & 0x000F;

                var x = ( opcode & 0x0F00 ) >> 8;
                var y = ( opcode & 0x00F0 ) >> 4;

                this._pc[ 0 ] += 2;

                switch ( subtype ) {

                    case 0x0 : // Sets VX to the value of VY.

                        this._registers[ x ] = this._registers[ y ];

                    break;

                    case 0x1 : // Sets VX to VX or VY.

                        this._registers[ x ] |= this._registers[ y ];

                    break;

                    case 0x2 : // Sets VX to VX and VY.

                        this._registers[ x ] &= this._registers[ y ];

                    break;

                    case 0x3 : // Sets VX to VX xor VY.

                        this._registers[ x ] ^= this._registers[ y ];

                    break;

                    case 0x4 : // Adds VY to VX. VF is set to 1 when there's a carry, and to 0 when there isn't.

                        var result = this._registers[ x ] + this._registers[ y ];

                        this._registers[ x ] = result;
                        this._registers[ 15 ] = this._registers[ x ] !== result;

                    break;

                    case 0x5 : // VY is subtracted from VX. VF is set to 0 when there's a borrow, and 1 when there isn't.

                        var result = this._registers[ x ] - this._registers[ y ];

                        this._registers[ x ] = result;
                        this._registers[ 15 ] = this._registers[ x ] === result;

                    break;

                    case 0x6 : // Shifts VX right by one. VF is set to the value of the least significant bit of VX before the shift.

                        this._registers[ x ] = this._registers[ y ];
                        this._registers[ 15 ] = !! ( this._registers[ x ] & 0x01 );
                        this._registers[ x ] >>= 1;

                    break;

                    case 0x7 : // Sets VX to VY minus VX. VF is set to 0 when there's a borrow, and 1 when there isn't.

                        var result = this._registers[ y ] - this._registers[ x ];

                        this._registers[ x ] = result;
                        this._registers[ 15 ] = this._registers[ x ] === result;

                    break;

                    case 0xE : // Shifts VX left by one. VF is set to the value of the most significant bit of VX before the shift.

                        this._registers[ x ] = this._registers[ y ];
                        this._registers[ 15 ] = !! ( this._registers[ x ] & 0x80 );
                        this._registers[ x ] <<= 1;

                    break;

                }

            return ;

            case 0x9 : // Skips the next instruction if VX equals VY.

                var x = ( opcode & 0x0F00 ) >> 8;
                var y = ( opcode & 0x00F0 ) >>  8;

                this._pc[ 0 ] += this._registers[ x ] === this._registers[ y ] ? 4 : 2;

            return ;

            case 0xA : // Sets I to the address NNN.

                var nnn = ( opcode & 0x0FFF ) >> 0;

                this._index[ 0 ] = nnn;

                this._pc[ 0 ] += 2;

            return ;

            case 0xB : // Jumps to the address NNN plus V0.

                var nnn = ( opcode & 0x0FFF ) >> 0;

                this._pc[ 0 ] = this._registers[ 0 ] + nnn;

            return ;

            case 0xC : // Sets VX to a random number and NN.

                var x = ( opcode & 0x0F00 ) >> 8;
                var nn = ( opcode & 0x00FF ) >> 0;

                this._registers[ x ] = Math.floor( Math.random( ) * 0xFF ) & nn;

            this._pc[ 0 ] += 2;

            return ;

            case 0xD : // Draws a sprite at coordinate (VX, VY) that has a width of 8 pixels and a height of N pixels.

                var x = ( opcode & 0x0F00 ) >> 8;
                var y = ( opcode & 0x00F0 ) >> 4;
                var n = ( opcode & 0x000F ) >> 0;

                var index = this._index[ 0 ];
                var rx = this._registers[ x ];
                var ry = this._registers[ y ];

                this._registers[ 15 ] = 0;

                for ( var v = 0; v < n; ++ v ) {
                    var row = this._memory[ index + v ];
                    for ( var u = 0; u < 8; ++ u ) {
                        if ( ( row >> u ) & 1 ) {
                            var i = ( ry + v ) * 64 + ( rx + 8 - u - 1 );
                            this._registers[ 15 ] = 1;
                            this._gfx[ i ] = ! this._gfx[ i ];
                            this._options.screen.setPixel( rx + 8 - u - 1, ry + v,
                                this._gfx[ i ]
                                ? 0xFFFFFF
                                : 0x000000
                            );
                        }
                    }
                }

                this._pc[ 0 ] += 2;

            return ;

            case 0xE :

                var subtype = opcode & 0x00FF;

                var x = ( opcode & 0x0F00 ) >> 8;

                switch ( subtype ) {

                    case 0x9E : // Skips the next instruction if the key stored in VX is pressed.

                        this._pc[ 0 ] += this._key[ this._registers[ x ] ] === 1 ? 4 : 2;

                    break ;

                    case 0xA1 : // Skips the next instruction if the key stored in VX isn't pressed.

                        this._pc[ 0 ] += this._key[ this._registers[ x ] ] === 0 ? 4 : 2;

                    break;

                }

            return ;

            case 0xF :

                var subtype = opcode & 0x00FF;

                var x = ( opcode & 0x0F00 ) >> 8;

                switch ( subtype ) {

                    case 0x07 : // Sets VX to the value of the delay timer.

                        this._registers[ x ] = this._delay[ 0 ];

                    break;

                    case 0x0A : // A key press is awaited, and then stored in VX.

                        this._waitForKey = x;

                        this.pause( );

                    break;

                    case 0x15 : // Sets the delay timer to VX.

                        this._delay[ 0 ] = this._registers[ x ];

                    break;

                    case 0x18 : // Sets the sound timer to VX.

                        this._sound[ 0 ] = this._registers[ x ];

                    break;

                    case 0x1E : // Adds VX to I.

                        this._index[ 0 ] += this._registers[ x ];

                    break;

                    case 0x29 : // Sets I to the location of the sprite for the character in VX. Characters 0-F (in hexadecimal) are represented by a 4x5 font.

                        this._index[ 0 ] = this._registers[ x ] * 5;

                    break;

                    case 0x33 : // Stores the Binary-coded decimal representation of VX, with the most significant of three digits at the address in I, the middle digit at I plus 1, and the least significant digit at I plus 2.

                        var index = this._index[ 0 ];
                        var value = ( '00' + this._registers[ x ].toString( 10 ) ).substr( - 3 );

                        this._memory[ index + 0 ] = parseInt( value[ 0 ], 10 );
                        this._memory[ index + 1 ] = parseInt( value[ 1 ], 10 );
                        this._memory[ index + 2 ] = parseInt( value[ 2 ], 10 );

                    break;

                    case 0x55 : // Stores V0 to VX in memory starting at address I.

                        var index = this._index[ 0 ];

                        for ( var t = 0; t <= x; ++ t )
                            this._memoryView.setUint8( index + t, this._registers[ t ] );

                        this._index[ 0 ] += x + 1;

                    break;

                    case 0x65 : // Fills V0 to VX with values from memory starting at address I.

                        var index = this._index[ 0 ];

                        for ( var t = 0; t <= x; ++ t )
                            this._registers[ t ] = this._memoryView.getUint8( index + t );

                        this._index[ 0 ] += x + 1;

                    break;

                }

                this._pc[ 0 ] += 2;

            return ;

        }

    };

    Engine.prototype._importFont = function ( ) {

        [
            0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
            0x20, 0x60, 0x20, 0x20, 0x70, // 1
            0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
            0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
            0x90, 0x90, 0xF0, 0x10, 0x10, // 4
            0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
            0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
            0xF0, 0x10, 0x20, 0x40, 0x40, // 7
            0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
            0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
            0xF0, 0x90, 0xF0, 0x90, 0x90, // A
            0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
            0xF0, 0x80, 0x80, 0x80, 0xF0, // C
            0xE0, 0x90, 0x90, 0x90, 0xE0, // D
            0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
            0xF0, 0x80, 0xF0, 0x80, 0x80  // F

        ].forEach( function ( value, index ) {

            this._memoryView.setUint8( 0 + index, value );

        }.bind( this ) );

    };

    Engine.prototype._onCharacterCallback = function ( character ) {

        if ( this.status === 'pause' && this._waitForKey === false )
            return ;

        var n = parseInt( character, 16 ) % 16;

        if ( isNaN( n ) )
            return ;

        this._keys.timers[ n ] = 1;

        this._options.timer.cancelTimeout( this._keys.timers[ n ] );
        this._keys.timers[ n ] = this._options.timer.createTimeout( function ( ) {
            this._keys.timers[ n ] = null;
            this._keys[ n ] = 0;
        }.bind( this ), 200 );

        if ( this._waitForKey !== false ) {
            this._registers[ this._waitForKey ] = n;
            this._waitForKey = false;
            this.resume( );
        }

    };

    return Engine;

} );
