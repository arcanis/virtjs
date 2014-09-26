var fragmentShaderCode = `
    precision mediump float;

    uniform sampler2D uScreenTexture;
    uniform vec2      uInputResolution;

    varying vec4 texCoord[8];

    const float coef      =  2.0;
    const float threshold = 15.0;

    const float y_weight  = 48.0;
    const float u_weight  =  7.0;
    const float v_weight  =  6.0;

    const mat3 yuv = mat3(0.299, -0.169, 0.499, 0.587, -0.331, -0.418, 0.114, 0.499, -0.0813);
    const mat3 yuv_weighted = yuv; // Is it useful ?

    vec4 RGBtoYUV(vec3 v0, vec3 v1, vec3 v2, vec3 v3) {

        float a = yuv_weighted[0].x * v0.x + yuv_weighted[0].y * v0.y + yuv_weighted[0].z * v0.z;
        float b = yuv_weighted[0].x * v1.x + yuv_weighted[0].y * v1.y + yuv_weighted[0].z * v1.z;
        float c = yuv_weighted[0].x * v2.x + yuv_weighted[0].y * v2.y + yuv_weighted[0].z * v2.z;
        float d = yuv_weighted[0].x * v3.x + yuv_weighted[0].y * v3.y + yuv_weighted[0].z * v3.z;

        return vec4(a, b, c, d);

    }

    bvec4 _and_(bvec4 A, bvec4 B) {

        return bvec4(A.x && B.x, A.y && B.y, A.z && B.z, A.w && B.w);

    }

    bvec4 _or_(bvec4 A, bvec4 B) {

        return bvec4(A.x || B.x, A.y || B.y, A.z || B.z, A.w || B.w);

    }

    vec4 df(vec4 A, vec4 B) {

        return vec4(abs(A - B));

    }

    bvec4 close(vec4 A, vec4 B) {

        return lessThan(df(A, B), vec4(threshold));

    }

    vec4 weighted_distance(vec4 a, vec4 b, vec4 c, vec4 d, vec4 e, vec4 f, vec4 g, vec4 h) {

        return df(a, b) + df(a, c) + df(d, e) + df(d, f) + 4.0 * df(g, h);

    }

    void main() {

        gl_FragColor = texture2D(uScreenTexture, texCoord[0].xy);
        return ;

        vec2 fp = fract(texCoord[0].xy * uInputResolution);

        vec3 A1 = texture2D(uScreenTexture, texCoord[1].xw).rgb;
        vec3 B1 = texture2D(uScreenTexture, texCoord[1].yw).rgb;
        vec3 C1 = texture2D(uScreenTexture, texCoord[1].zw).rgb;

        vec3 A  = texture2D(uScreenTexture, texCoord[2].xw).rgb;
        vec3 B  = texture2D(uScreenTexture, texCoord[2].yw).rgb;
        vec3 C  = texture2D(uScreenTexture, texCoord[2].zw).rgb;

        vec3 D  = texture2D(uScreenTexture, texCoord[3].xw).rgb;
        vec3 E  = texture2D(uScreenTexture, texCoord[3].yw).rgb;
        vec3 F  = texture2D(uScreenTexture, texCoord[3].zw).rgb;

        vec3 G  = texture2D(uScreenTexture, texCoord[4].xw).rgb;
        vec3 H  = texture2D(uScreenTexture, texCoord[4].yw).rgb;
        vec3 I  = texture2D(uScreenTexture, texCoord[4].zw).rgb;

        vec3 G5 = texture2D(uScreenTexture, texCoord[5].xw).rgb;
        vec3 H5 = texture2D(uScreenTexture, texCoord[5].yw).rgb;
        vec3 I5 = texture2D(uScreenTexture, texCoord[5].zw).rgb;

        vec3 A0 = texture2D(uScreenTexture, texCoord[6].xy).rgb;
        vec3 D0 = texture2D(uScreenTexture, texCoord[6].xz).rgb;
        vec3 G0 = texture2D(uScreenTexture, texCoord[6].xw).rgb;

        vec3 C4 = texture2D(uScreenTexture, texCoord[7].xy).rgb;
        vec3 F4 = texture2D(uScreenTexture, texCoord[7].xz).rgb;
        vec3 I4 = texture2D(uScreenTexture, texCoord[7].xw).rgb;

        vec4 b = RGBtoYUV(B, D, H, F);
        vec4 c = RGBtoYUV(C, A, G, I);
        vec4 e = RGBtoYUV(E, E, E, E);
        vec4 d = b.yzwx;
        vec4 f = b.wxyz;
        vec4 g = c.zwxy;
        vec4 h = b.zwxy;
        vec4 i = c.wxyz;

        vec4 i4 = RGBtoYUV(I4, C1, A0, G5);
        vec4 i5 = RGBtoYUV(I5, C4, A1, G0);
        vec4 h5 = RGBtoYUV(H5, F4, B1, D0);
        vec4 f4 = h5.yzwx;

        vec4 Ao = vec4( 1.0, -1.0, -1.0,  1.0 );
        vec4 Bo = vec4( 1.0,  1.0, -1.0, -1.0 );
        vec4 Co = vec4( 1.5,  0.5, -0.5,  0.5 );
        vec4 Ax = vec4( 1.0, -1.0, -1.0,  1.0 );
        vec4 Bx = vec4( 0.5,  2.0, -0.5, -2.0 );
        vec4 Cx = vec4( 1.0,  1.0, -0.5,  0.0 );
        vec4 Ay = vec4( 1.0, -1.0, -1.0,  1.0 );
        vec4 By = vec4( 2.0,  0.5, -2.0, -0.5 );
        vec4 Cy = vec4( 2.0,  0.0, -1.0,  0.5 );

        // These inequations define the line below which interpolation occurs
        bvec4 fx      = greaterThan(Ao * fp.y + Bo * fp.x, Co);
        bvec4 fx_left = greaterThan(Ax * fp.y + Bx * fp.x, Cx);
        bvec4 fx_up   = greaterThan(Ay * fp.y + By * fp.x, Cy);

        bvec4 t1 = _and_( notEqual(e, f), notEqual(e, h) );
        bvec4 t2 = _and_( not(close(f, b)), not(close(h, d)) );
        bvec4 t3 = _and_( _and_( close(e, i), not(close(f, i4)) ), not(close(h, i5)) );
        bvec4 t4 = _or_( close(e, g), close(e, c) );
        bvec4 interp_restriction_lv1 = _and_( t1, _or_( _or_(t2, t3), t4 ) );

        bvec4 interp_restriction_lv2_left = _and_( notEqual(e, g), notEqual(d, g) );
        bvec4 interp_restriction_lv2_up   = _and_( notEqual(e, c), notEqual(b, c) );

        bvec4 edr      = _and_( lessThan(weighted_distance(e, c, g, i, h5, f4, h, f),
                                         weighted_distance(h, d, i5, f, i4, b, e, i)), interp_restriction_lv1 );
        bvec4 edr_left = _and_( lessThanEqual(coef * df(f, g), df(h, c)), interp_restriction_lv2_left );
        bvec4 edr_up   = _and_( greaterThanEqual(df(f, g), coef * df(h, c)), interp_restriction_lv2_up );

        bvec4 nc = _and_( edr, _or_( _or_( fx, _and_(edr_left, fx_left) ), _and_(edr_up, fx_up) ) );

        bvec4 px = lessThanEqual(df(e, f), df(e, h));

        vec3 res = nc.x ? px.x ? F : H : nc.y ? px.y ? B : F : nc.z ? px.z ? D : B : nc.w ? px.w ? H : D : E;

        gl_FragColor.rgb = res;
        gl_FragColor.a = 1.0;

    }
`;

var vertexShaderCode = `
    precision mediump float;

    uniform mat4 uMatrix;
    uniform vec2 uInputResolution;

    attribute vec3 aVertexPosition;
    attribute vec2 aVertexTextureUv;

    varying vec4 texCoord[8];

    void main(void) {

        float dx = 1.0 / uInputResolution.x;
        float dy = 1.0 / uInputResolution.y;

        //     A1 B1 C1
        //  A0  A  B  C C4
        //  D0  D  E  F F4
        //  G0  G  H  I I4
        //     G5 H5 I5

        vec4 texCoordBase = vec4( aVertexTextureUv.s, 1.0 - aVertexTextureUv.t, 0.0, 0.0 );

        texCoord[0] = texCoordBase;
        texCoord[1] = texCoordBase.xxxy + vec4(    -dx,   0,  dx, -2.0*dy);  //  A1 B1 C1
        texCoord[2] = texCoordBase.xxxy + vec4(    -dx,   0,  dx,     -dy);  //   A  B  C
        texCoord[3] = texCoordBase.xxxy + vec4(    -dx,   0,  dx,       0);  //   D  E  F
        texCoord[4] = texCoordBase.xxxy + vec4(    -dx,   0,  dx,      dy);  //   G  H  I
        texCoord[5] = texCoordBase.xxxy + vec4(    -dx,   0,  dx,  2.0*dy);  //  G5 H5 I5
        texCoord[6] = texCoordBase.xyyy + vec4(-2.0*dx, -dy,   0,      dy);  //  A0 D0 G0
        texCoord[7] = texCoordBase.xyyy + vec4( 2.0*dx, -dy,   0,      dy);  //  C4 F4 I4

        gl_Position = uMatrix * vec4(aVertexPosition, 1);

    }
`;

export class WebGLScreen {

    constructor( options = { } ) {

        this._canvas = options.element || document.createElement( 'canvas' );

        this._canvas.addEventListener( 'webglcontextlost', () => {
            this._context = null;
        } );

        this._canvas.addEventListener( 'webglcontextrestored', () => {
            this._setupContext( );
            this.setOutputSize( this._canvas.width, this._canvas.height );
        } );

        this._textureIndex = 0;

        this._setupContext( );

        this.setInputSize( 256, 256 );
        this.setOutputSize( 256, 256 );

        // Expose the canvas
        this.canvas = this._canvas;

    }

    setInputSize( width, height ) {

        this._width = width;
        this._height = height;

        this._data = new Uint8Array( this._width * this._height * 3 );

        this._updateViewport( );

    }

    setOutputSize( width, height ) {

        this._canvas.width = width;
        this._canvas.height = height;

        if ( this._context ) // No error when context lost
            this._context.viewport( 0, 0, this._canvas.width, this._canvas.height );

        this._updateViewport( );
        this._draw( );

    }

    setPixel( x, y, r, g, b ) {

        var target = this._data;
        var index = ( y * this._width + x ) * 3;

        target[ index + 0 ] = r;
        target[ index + 1 ] = g;
        target[ index + 2 ] = b;

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

        var options = { antialias : true };
        this._context = this._canvas.getContext( 'webgl', options ) || this._canvas.getContext( 'experimental-webgl', options );

        this._context.clearColor( 0.0, 0.0, 0.0, 0.0);
        this._context.blendFunc( this._context.SRC_ALPHA, this._context.ONE_MINUS_SRC_ALPHA );
        this._context.enable( this._context.BLEND );

        this._textures = [ this._createTexture( ), this._createTexture( ) ];

        this._fragmentShader = this._createShader( this._context.FRAGMENT_SHADER, fragmentShaderCode );
        this._vertexShader = this._createShader( this._context.VERTEX_SHADER, vertexShaderCode );

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

        if ( ! this._context )
            return ; // No error in context lost

        var inputWidth = this._width;
        var inputHeight = this._height;

        var outputWidth = this._canvas.width;
        var outputHeight = this._canvas.height;

        var widthRatio = outputWidth / inputWidth;
        var heightRatio = outputHeight / inputHeight;

        var ratio = Math.min( widthRatio, heightRatio );

        var viewportWidth = widthRatio / ratio;
        var viewportHeight = heightRatio / ratio;

        var matrix = this._createOrthoMatrix( - viewportWidth, viewportWidth, - viewportHeight, viewportHeight, - 100, 100 );
        this._context.uniformMatrix4fv( this._matrixLocation, false, matrix );
        this._context.uniform2f( this._inputResolutionLocation, inputWidth, inputHeight );
        this._context.uniform2f( this._outputResolutionLocation, outputWidth, outputHeight );
        this._context.uniform2f( this._viewportResolutionLocation, viewportWidth, viewportHeight );

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

        if ( ! this._context )
            return ; // No error in context lost

        this._context.clear( this._context.COLOR_BUFFER_BIT | this._context.DEPTH_BUFFER_BIT );

        var textureIndex = ( this._textureIndex ++ ) % 2;
        this._context.bindTexture( this._context.TEXTURE_2D, this._textures[ textureIndex ] );
        this._context.texImage2D( this._context.TEXTURE_2D, 0, this._context.RGB, this._width, this._height, 0, this._context.RGB, this._context.UNSIGNED_BYTE, this._data );

        this._context.bindBuffer( this._vertexIndexBuffer.bufferTarget, this._vertexIndexBuffer );
        this._context.drawElements( this._context.TRIANGLE_STRIP, this._vertexIndexBuffer.itemCount, this._context.UNSIGNED_SHORT, 0 );

    }

};
