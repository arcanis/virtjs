export function createDefensiveProxy(object) {

    if (typeof Proxy === `undefined`) {

        console.warn(`Proxies are not available in your browser, and have been turned off.`); // eslint-disable-line no-console

        return object;

    } else {

        console.warn(`Proxies are slows, and should not be enabled in production.`); // eslint-disable-line no-console

        return new Proxy(object, {

            get(target, property) {

                if (Reflect.has(target, property)) {

                    return target[property];

                } else {

                    throw new Error(`Undefined property cannot be get: ${property}`);

                }

            },

            set(target, property, value) {

                if (Reflect.has(target, property)) {

                    target[property] = value;

                } else {

                    throw new Error(`Undefined property cannot be set: ${property}`);

                }

            }

        });

    }

}

export function mixin(Base, ... mixins) {

    if (!Base)
        Base = class { };

    let mixed = class extends Base {

        constructor(... parameters) {

            super(... parameters);

            // eslint-disable-next-line no-shadow
            mixins.forEach(mixin => {
                Reflect.apply(mixin, this);
            });

        }

    };

    for (let mixin of mixins) // eslint-disable-line no-shadow
        for (let method of Object.keys(mixin.prototype))
            mixed.prototype[method] = mixin.prototype[method];

    return mixed;

}

export function serializeArrayBuffer(arrayBuffer) {

    let serialization = ``;

    for (let array = new Uint8Array(arrayBuffer), t = 0, T = array.length; t < T; ++t)
        serialization += String.fromCharCode(array[t]);

    return serialization;

}

export function serialize(data) {

    // eslint-disable-next-line no-shadow
    let getFormat = data => Object.keys(data).reduce((format, key) => {

        let value = data[key];

        if (value instanceof ArrayBuffer) {
            format[key] = `arraybuffer`;
        } else if (value && value.constructor === Object) {
            format[key] = getFormat(value);
        } else {
            format[key] = null;
        }

        return format;

    }, { });

    // eslint-disable-next-line no-shadow
    let simplify = data => Object.keys(data).reduce((simplified, key) => {

        let value = data[key];

        if (value instanceof ArrayBuffer) {
            simplified[key] = serializeArrayBuffer(value);
        } else if (value && value.constructor === Object) {
            simplified[key] = simplify(value);
        } else {
            simplified[key] = value;
        }

        return simplified;

    }, { });

    return JSON.stringify({

        format: getFormat(data),
        tree: simplify(data)

    });

}

export function unserializeArrayBuffer(serialization) {

    let buffer = new ArrayBuffer(serialization.length);
    let bufferView = new Uint8Array(buffer);

    for (let t = 0, T = bufferView.length; t < T; ++t)
        bufferView[t] = serialization.charCodeAt(t);

    return bufferView.buffer;

}

export function unserialize(serialization) {

    let complexify = (format, tree) => Object.keys(format).reduce((complexified, key) => {

        let type = format[key];
        let node = tree[key];

        if (type === `arraybuffer`) {
            complexified[key] = unserializeArrayBuffer(node);
        } else if (type && type.constructor === Object) {
            complexified[key] = complexify(type, node);
        } else {
            complexified[key] = node;
        }

        return complexified;

    }, { });

    let { format, tree } = typeof serialization === `object` ? serialization : JSON.parse(serialization);
    return complexify(format, tree);

}

export function clone(input) {

    if (typeof input !== `object`)
        return input;

    if (input instanceof Array)
        return input.map(value => clone(value));

    if (input instanceof ArrayBuffer)
        return input.slice(0);

    let output = {};

    for (let key of Object.keys(input))
        output[key] = clone(input[key]);

    return output;

}
