/*global Virtjs*/

( function ( ) {

    var fragmentShaderCode = [
        'precision mediump float;',
        '',
        'varying vec2 vTextureCoordinates;',
        '',
        'uniform sampler2D uSampler;',
        'uniform vec2 uResolution;',
        '',
        'void main( void ) {',
        '    vec2 uv2 = vTextureCoordinates * 2.0 - 1.0;',
        '    gl_FragColor = texture2D( uSampler, vec2( vTextureCoordinates.s, 1.0 - vTextureCoordinates.t ) );',
        '    gl_FragColor.rgb *= vec3( .4, .5, .4 );',
        '    gl_FragColor.rgb *= 1. - pow( length( uv2 * uv2 * uv2 * uv2 * uv2 ), 3. );',
        '    gl_FragColor.r *= ( ( .5 + abs( .5 - mod( uv2.y       , .021 ) / .021 ) * .5 ) * 3.5 );',
        '    gl_FragColor.g *= ( ( .5 + abs( .5 - mod( uv2.y + .007, .021 ) / .021 ) * .5 ) * 3.5 );',
        '    gl_FragColor.b *= ( ( .5 + abs( .5 - mod( uv2.y + .014, .021 ) / .021 ) * .5 ) * 3.5 );',
        '}'
    ].join( '\n' );

    var vertexShaderCode = [
        'uniform mat4 uMatrix;',
        '',
        'attribute vec3 aVertexPosition;',
        'attribute vec2 aVertexTexture;',
        '',
        'varying vec2 vTextureCoordinates;',
        '',
        'void main( void ) {',
        '    gl_Position = uMatrix * vec4(aVertexPosition, 1);',
        '    vTextureCoordinates = aVertexTexture;',
        '}'
    ].join( '\n' );

    Virtjs.screen.WebGL = Virtjs.ClassUtil.extend( {

        initialize : function ( ) {

            this._canvas = document.createElement( 'canvas' );
            this._context = this._canvas.getContext( 'webgl', { antialias : true } ) || this._canvas.getContext( 'experimental-webgl' );

            this._context.clearColor( 0.0, 0.0, 0.0, 1.0);

            this._textures = [ this._createTexture( ), this._createTexture( ) ];

            this._fragmentShader = this._createShader( this._context.FRAGMENT_SHADER, fragmentShaderCode );
            this._vertexShader = this._createShader( this._context.VERTEX_SHADER, vertexShaderCode );

            this._vertexPositionBuffer = this._createBuffer( this._context.ARRAY_BUFFER, 4, new Float32Array( [ -1, -1, 0, /**/ 1, -1, 0, /**/ 1, 1, 0, /**/ -1, 1, 0 ] ) );
            this._vertexTextureBuffer = this._createBuffer( this._context.ARRAY_BUFFER, 4, new Float32Array( [ 0, 0, /**/ 1, 0, /**/ 1, 1, /**/ 0, 1 ] ) );
            this._vertexIndexBuffer = this._createBuffer( this._context.ELEMENT_ARRAY_BUFFER, 4, new Uint16Array( [ 0, 1, 3, 2 ] ) );

            this._linkShaders( this._fragmentShader, this._vertexShader );

            // Expose the canvas
            this.canvas = this._canvas;

        },

        setInputSize : function ( width, height ) {

            this._width = width;
            this._height = height;

            this._data = new Uint8Array( this._width * this._height * 3 );

            this._updateViewport( );

        },

        setOutputSize : function ( width, height ) {

            this._canvas.width = width;
            this._canvas.height = height;

            this._context.viewport( 0, 0, this._canvas.width, this._canvas.height );

            this._updateViewport( );

        },

        setPixel : function ( x, y, r, g, b ) {

            var target = this._data;
            var index = ( y * this._width + x ) * 3;

            target[ index + 0 ] = r;
            target[ index + 1 ] = g;
            target[ index + 2 ] = b;

        },

        flushScreen : function ( ) {

            this._draw( );

        },

        _createTexture : function ( ) {

            var texture = this._context.createTexture( );

            return texture;

        },

        _createShader : function ( type, source ) {

            var shader = this._context.createShader( type );
            this._context.shaderSource( shader, source );
            this._context.compileShader( shader );

            if ( ! this._context.getShaderParameter( shader, this._context.COMPILE_STATUS ) ) {
                var error = this._context.getShaderInfoLog( shader );
                throw new Error( 'Shader compilation failed : ' + error );
            }

            return shader;

        },

        _createBuffer : function ( target, count, content ) {

            var buffer = this._context.createBuffer( );
            buffer.bufferTarget = target;
            buffer.itemCount = count;
            buffer.itemSize = content.length / count;

            this._context.bindBuffer( buffer.bufferTarget, buffer );
            this._context.bufferData( buffer.bufferTarget, content, this._context.STATIC_DRAW );

            return buffer;

        },

        _createOrthoMatrix : function ( left, right, bottom, top, near, far ) {

            var lr = 1 / ( left - right ), bt = 1 / ( bottom - top ), nf = 1 / ( near - far );

            return [ - 2 * lr, 0, 0, 0, 0, - 2 * bt, 0, 0, 0, 0, 2 * nf, 0, ( left + right ) * lr, ( bottom + top ) * bt, ( near + far ) * nf, 1 ];

        },

        _linkShaders : function ( ) {

            var shaderProgram = this._shaderProgram = this._context.createProgram( );
            this._context.attachShader( shaderProgram, this._vertexShader );
            this._context.attachShader( shaderProgram, this._fragmentShader );
            this._context.linkProgram( shaderProgram );

            if ( ! this._context.getProgramParameter( shaderProgram, this._context.LINK_STATUS ) )
                throw new Error( 'Shader linking failed' );

            this._context.useProgram( shaderProgram );

            this._matrixLocation = this._context.getUniformLocation( shaderProgram, 'uMatrix' );

            this._samplerUniform = this._context.getUniformLocation( shaderProgram, 'uSample' );
            this._context.uniform1i( this._samplerUniform, 0 );

            this._resolutionwebglLocation = this._context.getUniformLocation( shaderProgram, 'uResolution' );

            this._vertexPositionAttribute = this._context.getAttribLocation( shaderProgram, 'aVertexPosition' );
            this._context.enableVertexAttribArray( this._vertexPositionAttribute );

            this._vertexTextureAttribute = this._context.getAttribLocation( shaderProgram, 'aVertexTexture' );
            this._context.enableVertexAttribArray( this._vertexTextureAttribute );

        },

        _updateViewport : function ( ) {

            var widthRatio = this._canvas.width / this._width;
            var heightRatio = this._canvas.height / this._height;

            var ratio = Math.min( widthRatio, heightRatio );

            var viewportWidth = widthRatio / ratio;
            var viewportHeight = heightRatio / ratio;

            var matrix = this._createOrthoMatrix( - viewportWidth, viewportWidth, - viewportHeight, viewportHeight, - 100, 100 );
            this._context.uniformMatrix4fv( this._matrixLocation, false, matrix );
            this._context.uniform2f( this._resolutionLocation, viewportWidth, viewportHeight );

        },

        _draw : function ( ) {

            this._context.clear( this._context.COLOR_BUFFER_BIT | this._context.DEPTH_BUFFER_BIT );

            this._context.bindBuffer( this._vertexPositionBuffer.bufferTarget, this._vertexPositionBuffer );
            this._context.vertexAttribPointer( this._vertexPositionAttribute, this._vertexPositionBuffer.itemSize, this._context.FLOAT, false, 0, 0 );

            this._context.bindBuffer( this._vertexTextureBuffer.bufferTarget, this._vertexTextureBuffer );
            this._context.vertexAttribPointer( this._vertexTextureAttribute, this._vertexTextureBuffer.itemSize, this._context.FLOAT, false, 0, 0 );

            this._context.activeTexture( this._context.TEXTURE0 );
            this._context.bindTexture( this._context.TEXTURE_2D, this._textures[ 0 ] );
            this._context.texImage2D( this._context.TEXTURE_2D, 0, this._context.RGB, this._width, this._height, 0, this._context.RGB, this._context.UNSIGNED_BYTE, this._data );
            this._context.texParameteri( this._context.TEXTURE_2D, this._context.TEXTURE_MAG_FILTER, this._context.NEAREST );
            this._context.texParameteri( this._context.TEXTURE_2D, this._context.TEXTURE_MIN_FILTER, this._context.LINEAR );
            this._context.texParameteri( this._context.TEXTURE_2D, this._context.TEXTURE_WRAP_S, this._context.CLAMP_TO_EDGE );
            this._context.texParameteri( this._context.TEXTURE_2D, this._context.TEXTURE_WRAP_T, this._context.CLAMP_TO_EDGE );

            this._context.bindBuffer( this._vertexIndexBuffer.bufferTarget, this._vertexIndexBuffer );
            this._context.drawElements( this._context.TRIANGLE_STRIP, this._vertexIndexBuffer.itemCount, this._context.UNSIGNED_SHORT, 0 );

        }

    } );

} )( );
