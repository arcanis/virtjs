/*global module, Virtjs, define, preprocess*/

define( [

    'virtjs',

    './sources/components/CPU',
    './sources/components/GPU',
    './sources/components/IO',
    './sources/components/MMU',
    './sources/components/Timer',
    './sources/tables/mbcTypes',
    './sources/Environment'

], function ( Virtjs, CPU, GPU, IO, MMU, Timer, mbcTypes, Environment ) {

    return Virtjs.engine.GameBoy = Virtjs.Engine.extend( [

        Virtjs.EmitterMixin

    ], {

        initialize : function ( ) {

            Virtjs.Engine.prototype.initialize.apply( this, arguments );

            // Set screen size

            this._options.screen.setInputSize( 160, 144 );

            // No environment at the beginning - we need to load() one later on

            this.environment = null;

            // Instanciate engine components

            this.cpu   = new CPU   ( this );
            this.gpu   = new GPU   ( this );
            this.io    = new IO    ( this );
            this.mmu   = new MMU   ( this );
            this.timer = new Timer ( this );

            // These functions will be reinstrumented /and will lose their scopes/

            Virtjs.DebugUtil.preprocessFunction( this, '_load', this._options );
            Virtjs.DebugUtil.preprocessFunction( this, 'step', this._options );
            Virtjs.DebugUtil.preprocessFunction( this, 'setMaxSubIterations', this._options );
            Virtjs.DebugUtil.preprocessFunction( this, '_setupEnvironment', this._options );

        },

        _load : function ( romBuffer, options ) {

            options = options || { };

            this.environment = this._createEnvironment( romBuffer, options );
            this.cartridge = this._createRomMBC( this.environment );

            this.cpu.setup( );
            this.gpu.setup( );
            this.io.setup( );
            this.mmu.setup( );
            this.timer.setup( );
            this.cartridge.setup( );

            if ( typeof preprocess !== 'undefined' && ( preprocess.events || [ ] ).indexOf( 'load' ) !== - 1 ) {
                this.emit( 'load' );
            }

        },

        step : function ( ) {

            this._continue = true;

            // If the user has specified a `maxSubIterations` option, we prevent the CPU from running more than this number in a single pass.
            // In order to get an optimized execution path, this function will be preprocessed in order to remove unneeded branches.

            if ( typeof preprocess !== 'undefined' && typeof preprocess.maxSubIterations !== 'undefined' ) {

                for ( var t = 0; this._status === 'running' && this._continue && t < this._options.maxSubIterations; ++ t ) {
                    this.cpu.step( );
                }

            } else {

                while ( this._status === 'running' && this._continue ) {
                    this.cpu.step( );
                }

            }

        },

        disassembleAt : function ( address ) {

            try {
                var opcode = this.mmu.readUint8( address );
                var instruction = this.cpu._opcodeMaps.unprefixed[ opcode ];
            } catch ( e ) {
                var infos = { size : 1, label : '<corrupted : cannot fetch opcode>' };
            }

            if ( ! infos ) try { // In some cases, an instruction may be corrupted
                var infos = instruction ? instruction.xDefinition.debug.call( this._cpu, address + 1 ) : { size : 1, label : '<corrupted : null instruction>' };
            } catch ( e ) { // Since we're debugging, we shouldn't fail
                var infos = { size : 1, label : '<corrupted : ' + e.message + '>' };
            }

            infos.address = address;
            infos.opcode = [ ];

            for ( var offset = 0; offset < infos.size; ++ offset )
                infos.opcode.push( this.byteAt( address + offset ) );

            return infos;

        },

        byteAt : function ( address ) {

            try {
                return this.mmu.readUint8( address );
            } catch ( e ) {
                return NaN;
            }

        },

        setMaxSubIterations : function ( maxSubIterations ) {

            if ( typeof preprocess !== 'undefined' && typeof preprocess.maxSubIterations === 'undefined' )
                throw new Error( 'Cannot change the max sub iteration number of this engine - please set maxSubIterations to non-nil at creation' );

            this._options.maxSubIterations = maxSubIterations;

        },

        _createRomMBC : function ( environment ) {

            var mbcType = environment.rom[ 0x0147 ];
            return new ( mbcTypes[ mbcType ] )( this );

        },

        _createEnvironment : function ( romBuffer, options) {

            return ( options || { } ).environment || this._setupEnvironment( new Environment( romBuffer ) );

        },

        _setupEnvironment : function ( environment ) {

            if ( typeof preprocess === 'undefined' || ! preprocess.skipBios )
                return environment;

            // A register -> 0x01 : DMG  |  0x11 : CGB  |  0xFF : MGB

            environment.a[ 0 ] = 0x11;
            environment.f[ 0 ] = 0xb0;

            environment.b[ 0 ] = 0x00;
            environment.c[ 0 ] = 0x13;

            environment.d[ 0 ] = 0x00;
            environment.e[ 0 ] = 0xD8;

            environment.h[ 0 ] = 0x01;
            environment.l[ 0 ] = 0x4d;

            environment.pc[ 0 ] = 0x0100;
            environment.sp[ 0 ] = 0xfffe;

            environment.mmuBiosLocked = true;

            return environment;

        }

    }, {

        RIGHT  : 0x21,
        LEFT   : 0x22,
        UP     : 0x24,
        DOWN   : 0x28,

        A      : 0x11,
        B      : 0x12,

        SELECT : 0x14,
        START  : 0x18

    } );

} );
