import { formatAddress, formatHexadecimal } from '../../utils/FormatUtils';

export class TracerDebug {

    constructor( engine, options = { } ) {

        this._engine = engine;
        this._options = options;

        this._breakDelay = 0;
        this._skipBreakpoint = false;
        this._domEnabled = true;

        this._instructions = [ ];
        this._byAddress = { };
        this._breakpoints = { };

        this._instructions.getItemMetadata = index => {

            var metadata = { cssClasses : 'tracer-row' };

            if ( this._currentAddress === this._instructions[ index ].address )
                metadata.cssClasses +=' tracer-current';

            return metadata;

        };

        var slickBreakpointFormatter = ( row, cell, value ) => value ? '✓' : '';
        var addressFormatter         = ( row, cell, value ) => formatAddress( value, this._options.addressSize );
        var opcodeFormatter          = ( row, cell, value ) => value.map( opcode => formatHexadecimal( opcode, this._options.opcodeSize ) ).join( ' ' );

        var columns = [ { name : 'Breakpoint',  field : 'breakpoint', cssClass : 'tracer-cell tracer-cell-breakpoint', minWidth : 100, maxWidth : 100, formatter : slickBreakpointFormatter }
                      , { name : 'Address',     field : 'address',    cssClass : 'tracer-cell tracer-cell-address',    minWidth : 120, maxWidth : 120, formatter : addressFormatter }
                      , { name : 'Opcode',      field : 'opcode',     cssClass : 'tracer-cell tracer-cell-opcode',     minWidth : 200, maxWidth : 200, formatter : opcodeFormatter }
                      , { name : 'Instruction', field : 'label',      cssClass : 'tracer-cell tracer-cell-label'       } ];

        this._grid = new Slick.Grid( this._options.container, this._instructions, columns, {
            enableTextSelectionOnCells : true,
            enableColumnReorder : false,
            forceFitColumns : true
        } );

        this._grid.onClick.subscribe( ( e, args ) => {
            if ( args.cell !== 0 ) return ;
            var instruction = this._grid.getDataItem( args.row );
            this.toggleBreakpoint( instruction.address );
        } );

        this._grid.onKeyDown.subscribe( ( e, args ) => {
            if ( [ 13, 32 ].indexOf( e.keyCode ) === - 1 ) return ;
            var instruction = this._grid.getDataItem( args.row );
            this.toggleBreakpoint( instruction.address );
        } );

        this._engine.mmu.on( 'post-write', ( e ) => {
            this._refreshFrom( this._findInstruction( e.address ) );
        } );

        this._engine.on( 'setup', ( ) => {
            this._refreshAll( );
            this.enableDOM( );
        } );

        this._engine.on( 'instruction', ( e ) => {
            this._jumpCheck( e );
            this._breakCheck( e );
            this._updateCurrent( e );
        } );

    }

    continue( ) {

        this._skipBreakpoint = true;

        this._engine.resume( );

    }

    one( ) {

        this._skipBreakpoint = true;
        this._breakDelay = 2;

        this._engine.resume( );

    }

    toggleBreakpoint( address ) {

        var breakpointStatus = ! this._breakpoints[ address ];
        this._breakpoints[ address ] = breakpointStatus;

        var instruction = this._byAddress[ address ];

        if ( ! instruction )
            return ;

        instruction.breakpoint = breakpointStatus;
        this._updateAddress( address );
        this._render( );

    }

    disableDOM( ) {

        if ( ! this._domEnabled )
            return ;

        var currentAddress = this._currentAddress;
        this._currentAddress = undefined;
        this._updateAddress( currentAddress );
        this._render( );
        this._currentAddress = currentAddress;

        this._options.container.classList.add( 'tracer-disabled' );

        this._domEnabled = false;

    }

    enableDOM( ) {

        if ( this._domEnabled )
            return ;

        this._domEnabled = true;

        this._options.container.className = this._options.container.classList.remove( 'tracer-disabled' );

        this._invalidate( );
        this._updateRowCount( );

        this._render( );
        this._focusCurrent( );

    }

    pause( ) {

        this._breakDelay = 1;

    }

    render( ) {

        if ( ! this._domEnabled )
            return ;

        this._render( );

    }

    _refreshAll( ) {

        this._instructions.length = 0;

        for ( var instruction, address = 0, memorySize = this._options.memorySize; address < memorySize; address += instruction.size ) {
            var instruction = this._engine.disassembleAt( address );
            instruction.breakpoint = this._breakpoints[ address ];
            this._byAddress[ address ] = instruction;
            this._instructions.push( instruction );
        }

        this._invalidate( );

        this._requestRender( );

    }

    _refreshFrom( startInstruction ) {

        var address = startInstruction.address;
        var index = this._instructions.indexOf( startInstruction );

        var first = index;

        do {

            var newInstruction = this._engine.disassembleAt( address );

            for ( var offset = 0; offset < newInstruction.size; ++ offset ) {

                if ( ! this._byAddress[ address + offset ] )
                    continue ;

                delete this._byAddress[ address + offset ];
                this._instructions.splice( index, 1 );

            }

            this._instructions.splice( index, 0, this._byAddress[ address ] = newInstruction );

            address += newInstruction.size;
            index += 1;

        } while ( address < this._options.memorySize && ! this._byAddress[ address ] );

        if ( ! this._domEnabled )
            return ;

        this._invalidateRows( [ first, index ] );
        this._updateRowCount( );

        this._requestRender( );

    }

    _findInstruction( address ) {

        while ( address > 0 && ! this._byAddress[ address ] )
            address -= 1;

        if ( ! this._byAddress[ address ] )
            throw new Error( 'Instruction not found' );

        return this._byAddress[ address ];

    }

    _dummifyInstruction( instruction ) {

        var address = instruction.address;
        var index = this._instructions.indexOf( instruction );

        delete this._byAddress[ address ];
        this._instructions.splice( index, 1 );

        for ( var offset = 0; offset < instruction.size; ++ offset ) {

            var dummyInstruction = ( { address : address + offset, label : 'db', opcode : [ this._engine.byteAt( address + offset ) ], size : 1, breakpoint : this._breakpoints[ address + offset ] } );
            this._instructions.splice( index + offset, 0, this._byAddress[ address + offset ] = dummyInstruction );

        }

    }

    _requestRender( ) {

        if ( ! this._domEnabled )
            return ;

        if ( this._pendingRendering )
            return ;

        this._pendingRendering = setTimeout( ( ) => {
            this._render( );
        }, 500 );

    }

    _invalidate( ) {

        if ( ! this._domEnabled )
            return ;

        this._grid.invalidate( );

    }

    _invalidateRow( which ) {

        if ( ! this._domEnabled )
            return ;

        this._grid.invalidateRow( which );

    }

    _invalidateRows( which ) {

        if ( ! this._domEnabled )
            return ;

        this._grid.invalidateRows( which );

    }

    _updateRowCount( ) {

        if ( ! this._updateRowCount )
            return ;

        this._grid.updateRowCount( );

    }

    _render( ) {

        clearTimeout( this._pendingRendering );
        this._pendingRendering = undefined;

        this._grid.render( );

    }

    _jumpCheck( e ) {

        if ( this._byAddress[ e.address ] )
            return ;

        this._dummifyInstruction( this._findInstruction( e.address ) );

        this._refreshFrom( this._findInstruction( e.address ) );

    }

    _breakCheck( e ) {

        var naturalBreak = this._breakpoints[ e.address ] && ! this._skipBreakpoint;
        var delayBreak = this._breakDelay > 0 && ! -- this._breakDelay;

        if ( this._skipBreakpoint )
            this._skipBreakpoint = false;

        if ( ! naturalBreak && ! delayBreak )
            return ;

        e.break( );

        this.enableDOM( );

    }

    _updateAddress( address ) {

        if ( ! this._domEnabled )
            return ;

        var rowIndex = this._instructions.indexOf( this._byAddress[ address ] );
        this._invalidateRow( rowIndex );

    }

    _updateCurrent( e ) {

        var oldCurrentAddress = this._currentAddress;
        this._currentAddress = e.address;

        if ( ! this._domEnabled )
            return ;

        this._updateAddress( oldCurrentAddress );
        this._updateAddress( this._currentAddress );

        this._render( );
        this._focusCurrent( );

    }

    _focusCurrent( ) {

        var rowIndex = this._instructions.indexOf( this._byAddress[ this._currentAddress ] );
        this._grid.scrollRowIntoView( rowIndex );

    }

};
