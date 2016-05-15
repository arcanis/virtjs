let LISTENERS = Symbol();

export class EmitterMixin {

    constructor() {

        this[LISTENERS] = { [`*`]: [ ] };

    }

    on(event, callback, context) {

        if (typeof this[LISTENERS][event] === `undefined`)
            this[LISTENERS][event] = [ ];

        this[LISTENERS][event].push([ callback, context ]);

    }

    off(event, callback, context) {

        if (typeof this[LISTENERS][event] === `undefined`)
            return;

        let listeners = this[LISTENERS][event];

        for (let t = 0, T = listeners.length; t < T; ++t)
            if (listeners[t][0] === callback && listeners[t][1] === context)
                break;

        listeners.splice(listeners.findIndex(([ lCallback, lContext ]) => {
            return lCallback === callback && lContext === context;
        }), 1);

    }

    emit(event, data) {

        if (typeof this[LISTENERS][event] === `undefined`)
            return;

        this[LISTENERS][event].forEach(([ callback, context ]) => {
            Reflect.apply(callback, context, [ data ]);
        });

        this[LISTENERS][`*`].forEach(([ callback, context ]) => {
            Reflect.apply(callback, context, [ event, data ]);
        });

    }

}
