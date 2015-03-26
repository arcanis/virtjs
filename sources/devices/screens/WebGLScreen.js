var gWebGlSupportedInputFormats = [

    { depth : 16, rMask : 0b1111100000000000, gMask : 0b0000011111100000, bMask : 0b0000000000011111, aMask : 0b0000000000000000, _typedView : Uint16Array,
      /* The following is private and shouldn't be used anywhere else */ _format : 'RGB', _type : 'UNSIGNED_SHORT_5_6_5' }

];

var gVertexShaderScript = `

    precision mediump float;

    uniform mat4 uMatrix;

    attribute vec3 aVertexPosition;
    attribute vec2 aVertexTextureUv;

    varying vec2 vTextureCoordinates;

    void main( void ) {

        vTextureCoordinates = vec2( aVertexTextureUv.s, 1.0 - aVertexTextureUv.t );

        gl_Position = uMatrix * vec4( aVertexPosition, 1.0 );

    }

`;

var gFragmentShaderScript = `

    precision mediump float;

    uniform sampler2D uScreenTexture;

    varying vec2 vTextureCoordinates;

    void main( void ) {

        gl_FragColor = texture2D( uScreenTexture, vTextureCoordinates );

    }

`;

function getMatchingInputFormat( { depth, rMask, gMask, bMask, aMask } ) {

    for ( var supported of gWebGlSupportedInputFormats )
        if ( depth === supported.depth && rMask === supported.rMask && gMask === supported.gMask && bMask === supported.bMask && aMask === supported.aMask )
            return supported;

    return null;

}

export class WebGLScreen {

    constructor( { canvas = document.createElement( 'canvas' ), useDebugContext = false } = { } ) {

        this.canvas = canvas;
        this.gl = null;

        this.inputWidth = 0;
        this.inputHeight = 0;
        this.inputPitch = 0;

        this.inputFormat = null;
        this.inputData = null;

        this.outputWidth = 0;
        this.outputHeight = 0;

        this._pitchedInputData = null;

        this._useDebugContext = useDebugContext;
        this._shaderProgram = null;

        this._uMatrixLocation = null;
        this._uScreenTextureLocation = null;
        this._uInputResolutionLocation = null;
        this._uOutputResolutionLocation = null;

        this._aVertexPositionLocation = null;
        this._aVertexTextureUvLocation = null;

        this._textureIndex = 0;
        this._setupGl( );

        var boundingBox = this.canvas.getBoundingClientRect( );
        var width = boundingBox.width, height = boundingBox.height;

        this.setInputSize( width, height );
        this.setOutputSize( width, height );

    }

    setInputSize( width, height, pitch = width ) {

        if ( width === this.inputWidth && height === this.inputHeight && pitch === this.inputPitch )
            return ;

        this.inputWidth = width;
        this.inputHeight = height;
        this.inputPitch = pitch;

        this._setupAlignmentBuffer( );

        this._updateViewport( );
        this._draw( );

    }

    setOutputSize( width, height ) {

        if ( width === this.outputWidth && height === this.outputHeight )
            return ;

        this.outputWidth = width;
        this.outputHeight = height;

        this._updateViewport( );
        this._draw( );

    }

    setShaderProgram( shaderProgram ) {

        if ( shaderProgram === this._shaderProgram )
            return ;

        if ( this._shaderProgram !== null )
            this.gl.deleteProgram( this._shaderProgram );

        this._shaderProgram = shaderProgram;
        this.gl.useProgram( shaderProgram );

        this._uMatrixLocation = this.gl.getUniformLocation( shaderProgram, 'uMatrix' );

        this._uScreenTextureLocation = this.gl.getUniformLocation( shaderProgram, 'uScreenTexture' );
        this.gl.uniform1i( this._uScreenTextureLocation, 0 );

        this._uInputResolutionLocation = this.gl.getUniformLocation( shaderProgram, 'uInputResolution' );
        this._uOutputResolutionLocation = this.gl.getUniformLocation( shaderProgram, 'uOutputResolution' );
        this._uViewportResolutionLocation = this.gl.getUniformLocation( shaderProgram, 'uViewportResolution' );

        this._aVertexPositionLocation = this.gl.getAttribLocation( shaderProgram, 'aVertexPosition' );
        this.gl.enableVertexAttribArray( this._aVertexPositionLocation );

        this._aVertexTextureUvLocation = this.gl.getAttribLocation( shaderProgram, 'aVertexTextureUv' );
        this.gl.enableVertexAttribArray( this._aVertexTextureUvLocation );

        this.gl.bindBuffer( this._vertexPositionBuffer.bufferTarget, this._vertexPositionBuffer );
        this.gl.vertexAttribPointer( this._aVertexPositionLocation, this._vertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0 );

        this.gl.bindBuffer( this._vertexTextureUvBuffer.bufferTarget, this._vertexTextureUvBuffer );
        this.gl.vertexAttribPointer( this._aVertexTextureUvLocation, this._vertexTextureUvBuffer.itemSize, this.gl.FLOAT, false, 0, 0 );

    }

    validateInputFormat( format ) {

        return getMatchingInputFormat( format ) !== null;

    }

    setInputFormat( partialFormat ) {

        var fullFormat = getMatchingInputFormat( partialFormat );

        if ( !fullFormat )
            throw new Error( 'Invalid input format' );

        this.inputFormat = fullFormat;

        this._setupAlignmentBuffer( );

    }

    setInputData( data ) {

        if ( ! data )
            return ;

        this.inputData = data;

    }

    flushScreen( ) {

        this._draw( );

    }

    _createTexture( ) {

        var texture = this.gl.createTexture( );

        return texture;

    }

    _createBuffer( target, count, content ) {

        var buffer = this.gl.createBuffer( );
        buffer.bufferTarget = target;
        buffer.itemCount = count;
        buffer.itemSize = content.length / count;

        this.gl.bindBuffer( buffer.bufferTarget, buffer );
        this.gl.bufferData( buffer.bufferTarget, content, this.gl.STATIC_DRAW );

        return buffer;

    }

    _createOrthoMatrix( left, right, bottom, top, near, far ) {

        var lr = 1 / ( left - right ), bt = 1 / ( bottom - top ), nf = 1 / ( near - far );

        return [ - 2 * lr, 0, 0, 0, 0, - 2 * bt, 0, 0, 0, 0, 2 * nf, 0, ( left + right ) * lr, ( bottom + top ) * bt, ( near + far ) * nf, 1 ];

    }

    _setupGl( ) {

        var options = { };

        this.gl = this.canvas.getContext( 'webgl', options ) || this.canvas.getContext( 'experimental-webgl', options );

        if ( this._useDebugContext )
            this.gl = WebGLDebugUtils.makeDebugContext( this.gl );

        this.gl.clearColor( 0.0, 0.0, 0.0, 0.0);
        this.gl.blendFunc( this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA );
        this.gl.enable( this.gl.BLEND );

        this._vertexPositionBuffer = this._createBuffer( this.gl.ARRAY_BUFFER, 4, new Float32Array( [ -1, -1, 0, /**/ 1, -1, 0, /**/ 1, 1, 0, /**/ -1, 1, 0 ] ) );
        this._vertexTextureUvBuffer = this._createBuffer( this.gl.ARRAY_BUFFER, 4, new Float32Array( [ 0, 0, /**/ 1, 0, /**/ 1, 1, /**/ 0, 1 ] ) );
        this._vertexIndexBuffer = this._createBuffer( this.gl.ELEMENT_ARRAY_BUFFER, 4, new Uint16Array( [ 0, 1, 3, 2 ] ) );

        this._fragmentShader = this._createShader( this.gl.FRAGMENT_SHADER, gFragmentShaderScript );
        this._vertexShader = this._createShader( this.gl.VERTEX_SHADER, gVertexShaderScript );
        this._linkShaders( this._fragmentShader, this._vertexShader );

        this.gl.activeTexture( this.gl.TEXTURE0 );

        this._textures = [ this._createTexture( ), this._createTexture( ) ];

        this._textures.forEach( texture => {

            this.gl.bindTexture( this.gl.TEXTURE_2D, texture );

            this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST );
            this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST );
            this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE );
            this.gl.texParameteri( this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE );

        } );

    }

    _createShader( type, script ) {

        var shader = this.gl.createShader( type );

        this.gl.shaderSource( shader, script );
        this.gl.compileShader( shader );

        if ( ! this.gl.getShaderParameter( shader, this.gl.COMPILE_STATUS ) )
            throw new Error( 'Shader compilation failed : ' + this.gl.getShaderInfoLog( shader ) );

        return shader;

    }

    _linkShaders( vertexShader, fragmentShader ) {

        var shaderProgram = this.gl.createProgram( );

        this.gl.attachShader( shaderProgram, vertexShader );
        this.gl.attachShader( shaderProgram, fragmentShader );

        this.gl.linkProgram( shaderProgram );

        if ( ! this.gl.getProgramParameter( shaderProgram, this.gl.LINK_STATUS ) )
            throw new Error( 'Shader linking failed : ' + this.gl.getError( ) );

        this.setShaderProgram( shaderProgram );

    }

    _setupAlignmentBuffer( ) {

        if ( ! this.inputFormat )
            return ;

        if ( this.inputPitch === this.inputWidth * this.inputFormat.depth / 8 ) {
            this._alignedData = null;
        } else {
            this._alignedData = new this.inputFormat._typedView( this.inputWidth * this.inputHeight );
        }

    }

    _getAlignedData( ) {

        if ( ! this._alignedData )
            return this.inputData;

        var height = this.inputHeight;
        var byteLength = this.inputFormat.depth / 8;

        var sourceRowSize = this.inputPitch / byteLength;
        var destinationRowSize = this.inputWidth;

        var source = this.inputData;
        var destination = this._alignedData;

        var sourceIndex = 0;
        var destinationIndex = 0;

        for ( var y = 0; y < height; ++ y ) {

            for ( var t = 0; t < destinationRowSize; ++ t )
                destination[ destinationIndex + t ] = source[ sourceIndex + t ];

            sourceIndex += sourceRowSize;
            destinationIndex += destinationRowSize;

        }

        return this._alignedData;

    }

    _updateViewport( ) {

        var inputWidth = this.inputWidth;
        var inputHeight = this.inputHeight;

        var outputWidth = this.outputWidth;
        var outputHeight = this.outputHeight;

        var isUndefined = value => value == null || value === '';

        if ( isUndefined( outputWidth ) && isUndefined( outputHeight ) )
            outputWidth = inputWidth, outputHeight = inputHeight;

        if ( isUndefined( outputWidth ) )
            outputWidth = inputWidth * ( outputHeight / inputHeight );

        if ( isUndefined( outputHeight ) )
            outputHeight = inputHeight * ( outputWidth / inputWidth );

        var widthRatio = outputWidth / inputWidth;
        var heightRatio = outputHeight / inputHeight;

        var ratio = Math.min( widthRatio, heightRatio );

        var viewportWidth = widthRatio / ratio;
        var viewportHeight = heightRatio / ratio;

        this.canvas.width = outputWidth;
        this.canvas.height = outputHeight;

        var matrix = this._createOrthoMatrix( - viewportWidth, viewportWidth, - viewportHeight, viewportHeight, - 100, 100 );
        this.gl.uniformMatrix4fv( this._uMatrixLocation, false, matrix );

        this.gl.uniform2f( this._uInputResolutionLocation, inputWidth, inputHeight );
        this.gl.uniform2f( this._uOutputResolutionLocation, outputWidth, outputHeight );
        this.gl.uniform2f( this._uViewportResolutionLocation, viewportWidth * inputWidth, viewportHeight * inputHeight );

        this.gl.viewport( 0, 0, outputWidth, outputHeight );

    }

    _draw( ) {

        this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

        if ( ! this.inputData || this.inputWidth === 0 || this.inputHeight === 0 )
            return ;

        var format = this.gl[ this.inputFormat._format ];
        var type = this.gl[ this.inputFormat._type ];
        var data = this._getAlignedData( );

        var textureIndex = ( this._textureIndex ++ ) % 2;
        this.gl.bindTexture( this.gl.TEXTURE_2D, this._textures[ textureIndex ] );
        this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGB, this.inputWidth, this.inputHeight, 0, format, type, data );

        this.gl.bindBuffer( this._vertexIndexBuffer.bufferTarget, this._vertexIndexBuffer );
        this.gl.drawElements( this.gl.TRIANGLE_STRIP, this._vertexIndexBuffer.itemCount, this.gl.UNSIGNED_SHORT, 0 );

    }

};
