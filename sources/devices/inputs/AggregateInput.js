export class AggregateInput {

    /**
     * An AggregateInput is an input device that combines multiple other inputs together.
     *
     * @constructor
     * @implements {Input}
     *
     * @param {Input[]} [sources] - The initial sources used for the aggregate.
     */

    constructor(sources = []) {

        this.inputs = [];

        for (let source of sources) {
            this.addSource(source);
        }

    }

    /**
     * Add a new input source inside the aggregate.
     *
     * @param {Input} input - The input to aggregate.
     */

    addSource(input) {

        if (this.inputs.includes(input))
            return;

        this.inputs.push(input);

    }

    /**
     * Remove an input source from the aggregate.
     *
     * @param {Input} input - The input to remove.
     */

    removeSource(input) {

        let index = this.inputs.indexOf(input);
        this.inputs.splice(index, 1);

    }

    /**
     * Simultaneously poll each aggregated input.
     */

    pollInputs() {

        for (let input of this.inputs) {
            input.pollInputs();
        }

    }

    /**
     * Returns true if any of the aggregated input should return true.
     *
     * @param {number} port - The input slot controller.
     * @param {number} code - The input slot code.
     */

    getState(port, code) {

        for (let input of this.inputs)
            if (input.getState(port, code))
                return true;

        return false;

    }

}
