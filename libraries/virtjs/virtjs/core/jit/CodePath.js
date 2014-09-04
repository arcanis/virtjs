export class CodePath {

    constructor( beginAddress, { maxSize } ) {

        this._compiler = null;

        this._maxSize = maxSize;

        this.begin = beginAddress;
        this.end = null;

        this.upToDate = false;
        this.overflow = 0;

        this.fn = null;

    }

    link( { compiler } ) {

        this._compiler = compiler;

    }

    rebuild( ) {

        var compilation = this._compiler.compileFrom( this.begin, this._maxSize );
        var { fn, overflow, end } = compilation;

        this.end = end;
        this.overflow = overflow;
        this.fn = fn;

        this.upToDate = true;

    }

};
