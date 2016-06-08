let BITS_PER_BYTE = 8;
let RENDER_DEPTH = 100;

let TYPED_VIEW = Symbol();
let GL_FORMAT = Symbol();
let GL_TYPE = Symbol();

let gWebGlSupportedInputFormats = [ {

    depth: 16,

    rMask: 0b1111100000000000,
    gMask: 0b0000011111100000,
    bMask: 0b0000000000011111,
    aMask: 0b0000000000000000,

    [TYPED_VIEW]: Uint16Array,
    [GL_FORMAT]: `RGB`,
    [GL_TYPE]: `UNSIGNED_SHORT_5_6_5`

} ];

let gVertexShaderScript = `

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

let gFragmentShaderScript = `

    precision mediump float;

    uniform sampler2D uScreenTexture;

    varying vec2 vTextureCoordinates;

    void main( void ) {

        gl_FragColor = texture2D( uScreenTexture, vTextureCoordinates );

    }

`;

function getMatchingInputFormat({ depth, rMask, gMask, bMask, aMask }) {

    for (let supported of gWebGlSupportedInputFormats)
        if (depth === supported.depth && rMask === supported.rMask && gMask === supported.gMask && bMask === supported.bMask && aMask === supported.aMask)
            return supported;

    return null;

}

function makeCanvasGlBuilder(canvas, options) {

    return () => {
        return canvas.getContext(`webgl`, options) || canvas.getContext(`experimental-webgl`, options);
    };

}

export class WebGLScreen {

    /**
     * A WebGLScreen is a screen device that uses a WebGL canvas as rendering target. Note that you can also use a headless-gl instance as rendering context, in which case you can simply pass null as canvas parameter.
     *
     * @constructor
     * @implements {Screen}
     *
     * @param {object} [options] - The screen options.
     * @param {CanvasElement} [options.canvas] - The target canvas.
     * @param {object} [options.glOptions] - The extra option used to setup the WebGL context.
     * @param {function} [options.glBuilder] - A factory that will build the WebGL context.
     */

    constructor({ canvas = document.createElement(`canvas`), glOptions = null, glBuilder = makeCanvasGlBuilder(canvas, glOptions) } = { }) {

        /**
         * The target canvas on which will be rendered the input data.
         *
         * @member
         * @readonly
         * @type {CanvasElement}
         */

        this.canvas = canvas;

        /**
         * The WebGL context used to render the input data.
         *
         * @member
         * @readonly
         * @type {WebGLRenderingContext}
         */

        this.gl = null;

        this.inputWidth = 0;
        this.inputHeight = 0;
        this.inputPitch = 0;

        this.inputFormat = null;
        this.inputData = null;

        this.outputWidth = 0;
        this.outputHeight = 0;

        this.pitchedInputData = null;

        this.shaderProgram = null;

        this.uMatrixLocation = null;
        this.uScreenTextureLocation = null;
        this.uInputResolutionLocation = null;
        this.uOutputResolutionLocation = null;

        this.aVertexPositionLocation = null;
        this.aVertexTextureUvLocation = null;

        this.textureIndex = 0;
        this.setupGl(glBuilder);

        let boundingBox = this.canvas && this.canvas.getBoundingClientRect();
        let { width, height } = boundingBox || { width: 100, height: 100 };

        this.setInputSize(Math.ceil(width), Math.ceil(height));
        this.setOutputSize(Math.ceil(width), Math.ceil(height));

    }

    setInputSize(width, height, pitch = width) {

        if (width === null && height === null)
            throw new Error(`Input width, height, and pitch cannot be null`);

        if (width === this.inputWidth && height === this.inputHeight && pitch === this.inputPitch)
            return;

        this.inputWidth = width;
        this.inputHeight = height;
        this.inputPitch = pitch;

        this.setupAlignmentBuffer();

        this.updateViewport();
        this.draw();

    }

    setOutputSize(width = null, height = null) {

        if (width === this.outputWidth && height === this.outputHeight)
            return;

        this.outputWidth = width;
        this.outputHeight = height;

        this.updateViewport();
        this.draw();

    }

    setShaderProgram(shaderProgram) {

        if (shaderProgram === this.shaderProgram)
            return;

        if (this.shaderProgram !== null)
            this.gl.deleteProgram(this.shaderProgram);

        this.shaderProgram = shaderProgram;
        this.gl.useProgram(shaderProgram);

        this.uMatrixLocation = this.gl.getUniformLocation(shaderProgram, `uMatrix`);

        this.uScreenTextureLocation = this.gl.getUniformLocation(shaderProgram, `uScreenTexture`);
        this.gl.uniform1i(this.uScreenTextureLocation, 0);

        this.uInputResolutionLocation = this.gl.getUniformLocation(shaderProgram, `uInputResolution`);
        this.uOutputResolutionLocation = this.gl.getUniformLocation(shaderProgram, `uOutputResolution`);
        this.uViewportResolutionLocation = this.gl.getUniformLocation(shaderProgram, `uViewportResolution`);

        this.aVertexPositionLocation = this.gl.getAttribLocation(shaderProgram, `aVertexPosition`);
        this.gl.enableVertexAttribArray(this.aVertexPositionLocation);

        this.aVertexTextureUvLocation = this.gl.getAttribLocation(shaderProgram, `aVertexTextureUv`);
        this.gl.enableVertexAttribArray(this.aVertexTextureUvLocation);

        this.gl.bindBuffer(this.vertexPositionBuffer.bufferTarget, this.vertexPositionBuffer);
        this.gl.vertexAttribPointer(this.aVertexPositionLocation, this.vertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.vertexTextureUvBuffer.bufferTarget, this.vertexTextureUvBuffer);
        this.gl.vertexAttribPointer(this.aVertexTextureUvLocation, this.vertexTextureUvBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

    }

    validateInputFormat(format) {

        return getMatchingInputFormat(format) !== null;

    }

    setInputFormat(partialFormat) {

        let fullFormat = getMatchingInputFormat(partialFormat);

        if (!fullFormat)
            throw new Error(`Invalid input format`);

        this.inputFormat = fullFormat;

        this.setupAlignmentBuffer();

    }

    setInputData(data) {

        if (!data)
            return;

        this.inputData = data;

    }

    flushScreen() {

        this.draw();

    }

    createTexture() {

        let texture = this.gl.createTexture();

        return texture;

    }

    createBuffer(target, count, content) {

        let buffer = this.gl.createBuffer();
        buffer.bufferTarget = target;
        buffer.itemCount = count;
        buffer.itemSize = content.length / count;

        this.gl.bindBuffer(buffer.bufferTarget, buffer);
        this.gl.bufferData(buffer.bufferTarget, content, this.gl.STATIC_DRAW);

        return buffer;

    }

    createOrthoMatrix(left, right, bottom, top, near, far) {

        let lr = 1 / (left - right);
        let bt = 1 / (bottom - top);
        let nf = 1 / (near - far);

        /* eslint-disable no-magic-numbers */

        return [ -2 * lr, 0, 0, 0, 0, -2 * bt, 0, 0, 0, 0, 2 * nf, 0, (left + right) * lr, (bottom + top) * bt, (near + far) * nf, 1 ];

        /* eslint-enable no-magic-numbers */

    }

    setupBuffers() {

        /* eslint-disable no-magic-numbers */

        this.vertexPositionBuffer = this.createBuffer(this.gl.ARRAY_BUFFER, 4, new Float32Array([ -1, -1, 0, /**/ 1, -1, 0, /**/ 1, 1, 0, /**/ -1, 1, 0 ]));
        this.vertexTextureUvBuffer = this.createBuffer(this.gl.ARRAY_BUFFER, 4, new Float32Array([ 0, 0, /**/ 1, 0, /**/ 1, 1, /**/ 0, 1 ]));
        this.vertexIndexBuffer = this.createBuffer(this.gl.ELEMENT_ARRAY_BUFFER, 4, new Uint16Array([ 0, 1, 3, 2 ]));

        /* eslint-enable no-magic-numbers */

    }

    setupShaders() {

        this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, gFragmentShaderScript);
        this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, gVertexShaderScript);
        this.linkShaders(this.fragmentShader, this.vertexShader);

    }

    setupTextures() {

        this.gl.activeTexture(this.gl.TEXTURE0);

        this.textures = [ this.createTexture(), this.createTexture() ];

        this.textures.forEach(texture => {

            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

        });

    }

    setupGl(glBuilder) {

        this.gl = glBuilder();
        this.gl.clearColor(0, 0, 0, 0);

        this.setupBuffers();
        this.setupShaders();
        this.setupTextures();

    }

    createShader(type, script) {

        let shader = this.gl.createShader(type);

        this.gl.shaderSource(shader, script);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
            throw new Error(`Shader compilation failed: ${this.gl.getShaderInfoLog(shader)}`);

        return shader;

    }

    linkShaders(vertexShader, fragmentShader) {

        let shaderProgram = this.gl.createProgram();

        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);

        this.gl.linkProgram(shaderProgram);

        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS))
            throw new Error(`Shader linking failed: ${this.gl.getError()}`);

        this.setShaderProgram(shaderProgram);

    }

    setupAlignmentBuffer() {

        if (!this.inputFormat)
            return;

        if (this.inputPitch === this.inputWidth * this.inputFormat.depth / BITS_PER_BYTE) {
            this.alignedData = null;
        } else {
            this.alignedData = new this.inputFormat[TYPED_VIEW](this.inputWidth * this.inputHeight);
        }

    }

    getAlignedData() {

        if (!this.alignedData)
            return this.inputData;

        let height = this.inputHeight;
        let byteLength = this.inputFormat.depth / BITS_PER_BYTE;

        let sourceRowSize = this.inputPitch / byteLength;
        let destinationRowSize = this.inputWidth;

        let source = this.inputData;
        let destination = this.alignedData;

        let sourceIndex = 0;
        let destinationIndex = 0;

        for (let y = 0; y < height; ++y) {

            for (let t = 0; t < destinationRowSize; ++t)
                destination[destinationIndex + t] = source[sourceIndex + t];

            sourceIndex += sourceRowSize;
            destinationIndex += destinationRowSize;

        }

        return this.alignedData;

    }

    updateViewport() {

        let inputWidth = Math.max(1, this.inputWidth);
        let inputHeight = Math.max(1, this.inputHeight);

        let outputWidth = Math.max(1, this.outputWidth);
        let outputHeight = Math.max(1, this.outputHeight);

        if (outputWidth === null && outputHeight === null) {
            outputWidth = inputWidth;
            outputHeight = inputHeight;
        }

        if (outputWidth === null)
            outputWidth = inputWidth * (outputHeight / inputHeight);

        if (outputHeight === null)
            outputHeight = inputHeight * (outputWidth / inputWidth);

        let widthRatio = outputWidth / inputWidth;
        let heightRatio = outputHeight / inputHeight;

        let ratio = Math.min(widthRatio, heightRatio);

        let viewportWidth = widthRatio / ratio;
        let viewportHeight = heightRatio / ratio;

        if (this.canvas) {
            this.canvas.width = outputWidth;
            this.canvas.height = outputHeight;
        }

        if (this.gl.resize)
            this.gl.resize(outputWidth, outputHeight);

        let matrix = this.createOrthoMatrix(-viewportWidth, viewportWidth, -viewportHeight, viewportHeight, -RENDER_DEPTH, RENDER_DEPTH);
        this.gl.uniformMatrix4fv(this.uMatrixLocation, false, matrix);

        this.gl.uniform2f(this.uInputResolutionLocation, inputWidth, inputHeight);
        this.gl.uniform2f(this.uOutputResolutionLocation, outputWidth, outputHeight);
        this.gl.uniform2f(this.uViewportResolutionLocation, viewportWidth * inputWidth, viewportHeight * inputHeight);

        this.gl.viewport(0, 0, outputWidth, outputHeight);

    }

    draw() {

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        if (!this.inputData || this.inputWidth === 0 || this.inputHeight === 0)
            return;

        let format = this.gl[this.inputFormat[GL_FORMAT]];
        let type = this.gl[this.inputFormat[GL_TYPE]];
        let data = this.getAlignedData();

        let textureIndex = this.textureIndex++ % 2;
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[textureIndex]);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.inputWidth, this.inputHeight, 0, format, type, data);

        this.gl.bindBuffer(this.vertexIndexBuffer.bufferTarget, this.vertexIndexBuffer);
        this.gl.drawElements(this.gl.TRIANGLE_STRIP, this.vertexIndexBuffer.itemCount, this.gl.UNSIGNED_SHORT, 0);

    }

}
