import { DataScreen } from 'virtjs/devices/screens/DataScreen';

var v = value => {

    if ( typeof value === 'undefined' )
        value = 0;

    if ( value % 1 === 0 )
        return value + '.0';

    return value.toString( );

};

var vertexShaderBuilder = ( { } = { } ) => `

    precision mediump float;

    uniform mat4 uMatrix;
    uniform vec2 uInputResolution;

    attribute vec3 aVertexPosition;
    attribute vec2 aVertexTextureUv;

    varying vec2 vTextureCoordinates;

    void main( void ) {

        vTextureCoordinates = vec2( aVertexTextureUv.s, 1.0 - aVertexTextureUv.t );

        gl_Position = uMatrix * vec4( aVertexPosition, 1.0 );

    }

`;

var fragmentShaderBuilder = ( { hardScan, hardPix, darkMask, lightMask, outerVig, innerVig, bending } = { } ) => `

    precision mediump float;

    uniform sampler2D uScreenTexture;
    uniform vec2 uInputResolution;
    uniform vec2 uViewportResolution;

    varying vec2 vTextureCoordinates;

    // Scanline repetition :
    // Bigger divider is bigger scanlines

    vec2 scanlineResolution = uViewportResolution * 2.0;

    // Hardness of scanline :
    //  -8.0 = soft
    // -16.0 = medium

    float hardScan = ${v(hardScan)} * -12.0;

    // Hardness of pixels in scanline :
    // -2.0 = soft
    // -4.0 = hard

    float hardPix = ${v(hardPix)} * -3.0;

    // Amount of shadow mask.

    float maskDark = ${v(darkMask)};
    float maskLight = ${v(lightMask)};

    // Position for the outer vignette :

    float outerVig = ${v(outerVig)};

    // Position for the inner vignette :

    float innerVig = ${v(innerVig)};

    // Pixel bending :
    float bending = ${v(bending)};

    // sRGB to Linear :

    float ToLinear1 ( float c ) { return(c<=0.04045)?c/12.92:pow((c+0.055)/1.055,2.4); }
    vec3  ToLinear  ( vec3 c )  { return vec3(ToLinear1(c.r),ToLinear1(c.g),ToLinear1(c.b)); }

    // Linear to sRGB :

    float ToSrgb1 ( float c ) { return(c<0.0031308?c*12.92:1.055*pow(c,0.41666)-0.055); }
    vec3  ToSrgb  ( vec3 c )  { return vec3(ToSrgb1(c.r),ToSrgb1(c.g),ToSrgb1(c.b)); }

    // Nearest emulated sample given floating point position and texel offset :

    vec3 Fetch( vec2 position, vec2 offset ) {

        position = floor( position * scanlineResolution + offset ) / scanlineResolution;

        return ToLinear( texture2D( uScreenTexture, position, -16.0 ).rgb );

    }

    // Distance in emulated pixels to nearest texel :

    vec2 Dist( vec2 position ) {

        position = position * scanlineResolution;

        return -( ( position - floor( position ) ) - vec2( 0.5 ) );

    }

    // 1D Gaussian :

    float Gaus( float position, float scale ) {

        return exp2( scale * position * position );

    }

    // 3-tap Gaussian filter along horz line :

    vec3 Horz3( vec2 position, float offset ) {

        vec3 b = Fetch( position, vec2( -1.0, offset ) );
        vec3 c = Fetch( position, vec2(  0.0, offset ) );
        vec3 d = Fetch( position, vec2(  1.0, offset ) );

        float distance = Dist( position ).x;

        // Convert distance to weight
        float scale = hardPix;
        float wb = Gaus( distance - 1.0, scale );
        float wc = Gaus( distance + 0.0, scale );
        float wd = Gaus( distance + 1.0, scale );

        // Return filtered sample
        return ( b * wb + c * wc + d * wd ) / ( wb + wc + wd );

    }

    // 5-tap Gaussian filter along horz line :

    vec3 Horz5( vec2 position, float offset ) {

        vec3 a = Fetch( position, vec2( -2.0, offset ) );
        vec3 b = Fetch( position, vec2( -1.0, offset ) );
        vec3 c = Fetch( position, vec2(  0.0, offset ) );
        vec3 d = Fetch( position, vec2(  1.0, offset ) );
        vec3 e = Fetch( position, vec2(  2.0, offset ) );

        float distance = Dist( position ).x;

        // Convert distance to weight
        float scale = hardPix;
        float wa = Gaus( distance - 2.0, scale );
        float wb = Gaus( distance - 1.0, scale );
        float wc = Gaus( distance + 0.0, scale );
        float wd = Gaus( distance + 1.0, scale );
        float we = Gaus( distance + 2.0, scale );

        // Return filtered sample
        return ( a * wa + b * wb + c * wc + d * wd + e * we ) / ( wa + wb + wc + wd + we );

    }

    // Return scanline weight :

    float Scan( vec2 position, float offset ) {

        float distance = Dist( position ).y;

        return Gaus( distance + offset, hardScan );

    }

    // Allow nearest three lines to effect pixel :

    vec3 Tri( vec2 position ) {

        vec3 a = Horz3( position, -1.0 );
        vec3 b = Horz5( position,  0.0 );
        vec3 c = Horz3( position,  1.0 );

        float wa = Scan( position, -1.0 );
        float wb = Scan( position,  0.0 );
        float wc = Scan( position,  1.0 );

        return a * wa + b * wb + c * wc;

    }

    // Shadow mask :

    vec3 Mask( vec2 position ) {

        float n = fract( ( position.x + position.y * 3.0 ) / 6.0 );

        vec3 mask = vec3( maskDark, maskDark, maskDark );

        if ( n < 0.333 ) {
            mask.r = maskLight;
        } else if ( n < 0.666 ) {
            mask.g = maskLight;
        } else {
            mask.b = maskLight;
        }

        return mask;

    }

    // Vignette :

    float Vignette( vec2 position ) {

        float distX = abs( position.x - 0.5 ) * 2.0;
        float distY = abs( position.y - 0.5 ) * 2.0;

        float stepX = smoothstep( 1.0, .8, distX );
        float stepY = smoothstep( 1.0, .8, distY );

        return stepX * stepY;

    }

    // Bend screen :

    vec2 Bend( vec2 coord ) {

        float bend = 3.2;

        // put in symmetrical coords
        coord = (coord - 0.5) * 2.0;

        coord *= 1.1;

        // deform coords
        coord.x *= 1.0 + pow((abs(coord.y) / bend), 2.0);
        coord.y *= 1.0 + pow((abs(coord.x) / bend), 2.0);

        // transform back to 0.0 - 1.0 space
        coord = (coord / 2.0) + 0.5;

        return coord;

    }

    void main( void ) {

        vec2 position = vTextureCoordinates;

#if ${(bending != null) | 0}
        position = Bend( position );
#endif

#if ${(hardScan != null && hardPix != null) | 0}
        gl_FragColor = vec4( Fetch( position, vec2( 0.0, 0.0 ) ), 1.0 );
#else
        gl_FragColor = vec4( Tri( position ), 1.0 );
#endif

#if ${(darkMask != true && lightMask != null) | 0}
        gl_FragColor.rgb *= Mask( gl_FragCoord.xy );
#endif

        gl_FragColor.rgb = ToSrgb( gl_FragColor.rgb );

#if ${(outerVig != null && innerVig != null) | 0}
        gl_FragColor.rgb *= Vignette( position );
#endif

    }

`;

export class WebGLScreen extends DataScreen {

    constructor( options = { } ) {

        super( options );

        this._canvas = options.canvas || document.createElement( 'canvas' );

        this._outputWidth = 0;
        this._outputHeight = 0;

        this._filterOptions = options.filterOptions;
        this._textureIndex = 0;
        this._setupContext( );

        this.setInputSize( 256, 256 );
        this.setOutputSize( 256, 256 );

    }

    setInputSize( width, height ) {

        super( width, height );

        this._updateViewport( );
        this._draw( );

    }

    setOutputSize( width, height ) {

        this._outputWidth = this._canvas.width = width;
        this._outputHeight = this._canvas.height = height;

        this._context.viewport( 0, 0, this._canvas.width, this._canvas.height );

        this._updateViewport( );
        this._draw( );

    }

    flushScreen( ) {

        this._draw( );

    }

    _createTexture( ) {

        var texture = this._context.createTexture( );

        return texture;

    }

    _createShader( type, source ) {

        var shader = this._context.createShader( type );
        this._context.shaderSource( shader, source );
        this._context.compileShader( shader );

        if ( ! this._context.getShaderParameter( shader, this._context.COMPILE_STATUS ) ) {
            var error = this._context.getShaderInfoLog( shader );
            throw new Error( 'Shader compilation failed : ' + error );
        }

        return shader;

    }

    _createBuffer( target, count, content ) {

        var buffer = this._context.createBuffer( );
        buffer.bufferTarget = target;
        buffer.itemCount = count;
        buffer.itemSize = content.length / count;

        this._context.bindBuffer( buffer.bufferTarget, buffer );
        this._context.bufferData( buffer.bufferTarget, content, this._context.STATIC_DRAW );

        return buffer;

    }

    _createOrthoMatrix( left, right, bottom, top, near, far ) {

        var lr = 1 / ( left - right ), bt = 1 / ( bottom - top ), nf = 1 / ( near - far );

        return [ - 2 * lr, 0, 0, 0, 0, - 2 * bt, 0, 0, 0, 0, 2 * nf, 0, ( left + right ) * lr, ( bottom + top ) * bt, ( near + far ) * nf, 1 ];

    }

    _setupContext( ) {

        var options = { };

        this._context = this._canvas.getContext( 'webgl', options ) || this._canvas.getContext( 'experimental-webgl', options );

        this._context.clearColor( 0.0, 0.0, 0.0, 0.0);
        this._context.blendFunc( this._context.SRC_ALPHA, this._context.ONE_MINUS_SRC_ALPHA );
        this._context.enable( this._context.BLEND );

        this._textures = [ this._createTexture( ), this._createTexture( ) ];

        this._fragmentShader = this._createShader( this._context.FRAGMENT_SHADER, fragmentShaderBuilder( this._filterOptions ) );
        this._vertexShader = this._createShader( this._context.VERTEX_SHADER, vertexShaderBuilder( this._filterOptions ) );

        this._vertexPositionBuffer = this._createBuffer( this._context.ARRAY_BUFFER, 4, new Float32Array( [ -1, -1, 0, /**/ 1, -1, 0, /**/ 1, 1, 0, /**/ -1, 1, 0 ] ) );
        this._vertexTextureUvBuffer = this._createBuffer( this._context.ARRAY_BUFFER, 4, new Float32Array( [ 0, 0, /**/ 1, 0, /**/ 1, 1, /**/ 0, 1 ] ) );
        this._vertexIndexBuffer = this._createBuffer( this._context.ELEMENT_ARRAY_BUFFER, 4, new Uint16Array( [ 0, 1, 3, 2 ] ) );

        this._linkShaders( this._fragmentShader, this._vertexShader );
        this._bindAll( );

    }

    _linkShaders( ) {

        var shaderProgram = this._shaderProgram = this._context.createProgram( );
        this._context.attachShader( shaderProgram, this._vertexShader );
        this._context.attachShader( shaderProgram, this._fragmentShader );
        this._context.linkProgram( shaderProgram );

        if ( ! this._context.getProgramParameter( shaderProgram, this._context.LINK_STATUS ) )
            throw new Error( 'Shader linking failed : ' + this._context.getError( ) );

        this._context.useProgram( shaderProgram );

        this._matrixLocation = this._context.getUniformLocation( shaderProgram, 'uMatrix' );

        this._screenTextureLocation = this._context.getUniformLocation( shaderProgram, 'uScreenTexture' );
        this._context.uniform1i( this._screenTextureLocation, 0 );

        this._inputResolutionLocation = this._context.getUniformLocation( shaderProgram, 'uInputResolution' );
        this._outputResolutionLocation = this._context.getUniformLocation( shaderProgram, 'uOutputResolution' );
        this._viewportResolutionLocation = this._context.getUniformLocation( shaderProgram, 'uViewportResolution' );

        this._vertexPositionAttribute = this._context.getAttribLocation( shaderProgram, 'aVertexPosition' );
        this._context.enableVertexAttribArray( this._vertexPositionAttribute );

        this._vertexTextureUvAttribute = this._context.getAttribLocation( shaderProgram, 'aVertexTextureUv' );
        this._context.enableVertexAttribArray( this._vertexTextureUvAttribute );

    }

    _updateViewport( ) {

        var inputWidth = this._inputWidth;
        var inputHeight = this._inputHeight;

        var outputWidth = this._outputWidth;
        var outputHeight = this._outputHeight;

        var widthRatio = outputWidth / inputWidth;
        var heightRatio = outputHeight / inputHeight;

        var ratio = Math.min( widthRatio, heightRatio );

        var viewportWidth = widthRatio / ratio;
        var viewportHeight = heightRatio / ratio;

        var matrix = this._createOrthoMatrix( - viewportWidth, viewportWidth, - viewportHeight, viewportHeight, - 100, 100 );
        this._context.uniformMatrix4fv( this._matrixLocation, false, matrix );
        this._context.uniform2f( this._inputResolutionLocation, inputWidth, inputHeight );
        this._context.uniform2f( this._outputResolutionLocation, outputWidth, outputHeight );
        this._context.uniform2f( this._viewportResolutionLocation, viewportWidth * inputWidth, viewportHeight * inputHeight );

    }

    _bindAll( ) {

        this._context.bindBuffer( this._vertexPositionBuffer.bufferTarget, this._vertexPositionBuffer );
        this._context.vertexAttribPointer( this._vertexPositionAttribute, this._vertexPositionBuffer.itemSize, this._context.FLOAT, false, 0, 0 );

        this._context.bindBuffer( this._vertexTextureUvBuffer.bufferTarget, this._vertexTextureUvBuffer );
        this._context.vertexAttribPointer( this._vertexTextureUvAttribute, this._vertexTextureUvBuffer.itemSize, this._context.FLOAT, false, 0, 0 );

        this._context.activeTexture( this._context.TEXTURE0 );

        this._textures.forEach( texture => {
            this._context.bindTexture( this._context.TEXTURE_2D, texture );
            this._context.texParameteri( this._context.TEXTURE_2D, this._context.TEXTURE_MAG_FILTER, this._context.NEAREST );
            this._context.texParameteri( this._context.TEXTURE_2D, this._context.TEXTURE_MIN_FILTER, this._context.NEAREST );
            this._context.texParameteri( this._context.TEXTURE_2D, this._context.TEXTURE_WRAP_S, this._context.CLAMP_TO_EDGE );
            this._context.texParameteri( this._context.TEXTURE_2D, this._context.TEXTURE_WRAP_T, this._context.CLAMP_TO_EDGE );
        } );

    }

    _draw( ) {

        this._context.clear( this._context.COLOR_BUFFER_BIT | this._context.DEPTH_BUFFER_BIT );

        var textureIndex = ( this._textureIndex ++ ) % 2;
        this._context.bindTexture( this._context.TEXTURE_2D, this._textures[ textureIndex ] );
        this._context.texImage2D( this._context.TEXTURE_2D, 0, this._context.RGB, this._inputWidth, this._inputHeight, 0, this._context.RGB, this._context.UNSIGNED_BYTE, this._data );

        this._context.bindBuffer( this._vertexIndexBuffer.bufferTarget, this._vertexIndexBuffer );
        this._context.drawElements( this._context.TRIANGLE_STRIP, this._vertexIndexBuffer.itemCount, this._context.UNSIGNED_SHORT, 0 );

    }

};
