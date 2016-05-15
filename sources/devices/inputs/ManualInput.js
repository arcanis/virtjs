export class ManualInput {

    /**
     * A ManualInput is an input device that will transmit any state you manually set from a Javascript API. It's a strictly better {@link NullInput}, that works on any environment while still giving you a way to trigger some events when you need to.
     *
     * @constructor
     * @implements {Input}
     *
     * @param {object} [options] - The device options.
     * @param {object} [options.codeMap] - The initial code map.
     */

    constructor({ codeMap = null } = {}) {

        /**
         * This value contains the current code map used to translate codes.
         *
         * @member
         * @readonly
         * @type {object}
         */

        this.codeMap = null;

        this.devices = {};
        this.pending = {};

        this.setCodeMap(codeMap);

    }

    /**
     * Set the code map that will be used to translate input codes from one to another.
     *
     * @param {object} codeMap - The new input map.
     */

    setCodeMap(codeMap) {

        if (codeMap === this.codeMap)
            return;

        this.codeMap = codeMap;

    }

    /**
     * Set an input slot as being pressed.
     *
     * @param {number} port - The input slot controller port.
     * @param {number} code - The input slot code.
     */

    down(port, code) {

        if (this.codeMap)
            code = this.codeMap[code];

        this.pending[port] = this.pending[port] || {};
        this.pending[port][code] = true;

    }

    /**
     * Set an input slot as being released.
     *
     * @param {number} port - The input slot controller port.
     * @param {number} code - The input slot code.
     */

    up(port, code) {

        if (this.codeMap)
            code = this.codeMap[code];

        this.pending[port] = this.pending[port] || {};
        this.pending[port][code] = false;

    }

    pollInputs() {

        let pending = this.pending;
        this.pending = {};

        for (let port of Reflect.ownKeys(pending)) {
            for (let code of Reflect.ownKeys(pending[port])) {
                this.devices[port] = this.devices[port] || {};
                this.devices[port][code] = pending[port][code];
            }
        }

    }

    getState(port, code) {

        return Boolean(this.devices[port] && this.devices[port][code]);

    }

}
