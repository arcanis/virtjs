export function makeFastTick(beginning, ending, main) {

    /* eslint-disable no-nested-ternary */

    return beginning && ending ? function fastTickBE() {

        beginning();
        main();
        ending();

    } : beginning ? function fastTickB() {

        beginning();
        main();

    } : ending ? function fastTickE() {

        main();
        ending();

    } : main;

    /* eslint-enable no-nested-ternary */

}
