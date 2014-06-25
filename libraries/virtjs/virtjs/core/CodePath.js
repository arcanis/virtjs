export class CodePath {

    constructor( compiler, base, offset ) {

        this._compiler = compiler;

        this._invalidated = true;

        this._address = base + offset;

        this.doesOverflow = false;

        this.fn = null;

    }

    invalidate( ) {

        this._invalidated = true;

        this.doesOverflow = false;

        this.fn = null;

    }

    keepUpToDate( ) {

        if ( ! this._invalidated )
            return false;

        this.fn = this._compiler.compileFrom( this._address, 0x100 );

        this._invalidated = false;

        return true;

    }

};
