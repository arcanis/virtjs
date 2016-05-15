import { ManualInput } from 'virtjs/devices/inputs/ManualInput';

let DEFAULT_KEY_MAP = {

    /* eslint-disable no-magic-numbers */

    37: [ 0, `LEFT` ],   // arrow left
    39: [ 0, `RIGHT` ],  // arrow right
    38: [ 0, `UP` ],     // arrow up
    40: [ 0, `DOWN` ],   // arrow down

    65: [ 0, `A` ],      // 'A'
    81: [ 0, `A` ],      // 'Q'

    90: [ 0, `B` ],      // 'Z'
    87: [ 0, `B` ],      // 'W'
    66: [ 0, `B` ],      // 'B'

    76: [ 0, `L` ],      // 'L'
    82: [ 0, `R` ],      // 'R'

    13: [ 0, `START` ],  // enter

    8: [ 0, `SELECT` ],  // backspace
    32: [ 0, `SELECT` ]  // space

    /* eslint-enable no-magic-numbers */

};

export class KeyboardInput {

    /**
     * A KeyboardInput is an input device that will monitor the keystrokes on a specified DOM element and transmit those actions to the engines.
     *
     * @constructor
     * @implements {Input}
     *
     * @param {object} [options] - The device options.
     * @param {Element} [options.element] - The element on which will be bound the DOM listeners.
     * @param {KeyMap} [options.keyMap] - The initial key map.
     */

    constructor({ element = document.body, keyMap = DEFAULT_KEY_MAP, inputMap = null } = {}) {

        /**
         * This value contains the element on which the DOM listeners have been bound.
         *
         * @member
         * @readonly
         * @type {Element}
         */

        this.element = null;

        /**
         * This value contains the current key map used to filter keys.
         *
         * @member
         * @readonly
         * @type {KeyMap}
         */

        this.keyMap = null;

        this.input = new ManualInput({ inputMap });

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        this.setKeyMap(keyMap);
        this.setElement(element);

    }

    /**
     * Change the element on which are bound the DOM listeners.
     */

    setElement(element) {

        if (element === this.element)
            return;

        if (this.element !== null)
            this.detachEvents();

        this.element = element;

        if (this.element !== null) {
            this.attachEvents();
        }

    }

    /**
     * Set the key map that will be used to translate key codes into inputs.
     *
     * Any old key that doesn't map to the same input anymore will be automatically released.
     *
     * @param {KeyMap} keyMap - The new key map.
     */

    setKeyMap(keyMap) {

        if (keyMap === this.keyMap)
            return;

        if (this.keyMap) {
            for (let key of Reflect.ownKeys(this.keyMap)) {

                let [ port, code ] = this.keyMap[key];

                if (keyMap && Reflect.has(keyMap, key) && keyMap[key][0] === port && keyMap[key][1] === code)
                    continue;

                this.input.up(port, code);

            }
        }

        this.keyMap = keyMap;

    }

    /**
     * @borrows ManualInput#setCodeMap as KeyboardInput#setCodeMap
     */

    setCodeMap(codeMap) {

        this.input.setCodeMap(codeMap);

    }

    pollInputs() {

        this.input.pollInputs();

    }

    getState(port, code) {

        return this.input.getState(port, code);

    }

    attachEvents() {

        this.element.addEventListener(`keydown`, this.onKeyDown);
        this.element.addEventListener(`keyup`, this.onKeyUp);

    }

    detachEvents() {

        this.element.removeEventListener(`keydown`, this.onKeyDown);
        this.element.removeEventListener(`keyup`, this.onKeyUp);

    }

    onKeyDown(e) {

        if ([ `select`, `input`, `textarea` ].includes(e.target.tagName.toLowerCase()))
            return;

        if (e.keyCode === 8 /* backspace */) // eslint-disable-line no-magic-numbers
            e.preventDefault();

        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
            return;

        if (!Reflect.has(this.keyMap, e.keyCode))
            return;

        e.preventDefault();

        let [ port, code ] = this.keyMap[e.keyCode];
        this.input.down(port, code);

    }

    onKeyUp(e) {

        if (!Reflect.has(this.keyMap, e.keyCode))
            return;

        let [ port, code ] = this.keyMap[e.keyCode];
        this.input.up(port, code);

    }

}
