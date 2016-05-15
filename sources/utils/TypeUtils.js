export let toSigned8 = (() => {

    let tmp = new Int8Array(1);

    return n => {

        tmp[0] = n;

        return tmp[0];

    };

})();
