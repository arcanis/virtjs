let BITS_PER_HEX_CHAR = 4;
let HEX_BASE = 16;

export function formatAddress(address, bits, withPrefix = true) {

    if (isNaN(address))
        return `NaN`;

    let str = Number(address).toString(HEX_BASE).toLowerCase();

    if (typeof bits !== `undefined`)
        while (str.length < Math.ceil(bits / BITS_PER_HEX_CHAR))
            str = `0` + str; // eslint-disable-line prefer-template

    if (withPrefix)
        str = `$` + str; // eslint-disable-line prefer-template

    return str;

}

export function formatRelativeAddress(sourceAddress, relativeAddress, sourceBits, relativeBits) {

    let sign = relativeAddress < 0 ? `-` : `+`;

    if (typeof relativeAddress !== `string` || !isNaN(relativeAddress))
        relativeAddress = formatAddress(Math.abs(relativeAddress), relativeBits, false);

    return formatAddress(sourceAddress, sourceBits) + sign + relativeAddress;

}

export function formatDecimal(value, size) {

    if (isNaN(value))
        return `NaN`;

    let str = Number(value).toString();

    if (typeof size === `undefined`)
        return str;

    for (let t = str.length; t < size; ++t)
        str = `0` + str; // eslint-disable-line prefer-template

    return str;

}

export function formatString(str, size, leftAligned = true) {

    str = str.toString();

    if (typeof size === `undefined`)
        return str;

    for (let t = str.length; t < size; ++t) {
        if (leftAligned) {
            str = str + ` `; // eslint-disable-line prefer-template
        } else {
            str = ` ` + str; // eslint-disable-line prefer-template
        }
    }

    return str;

}

export function formatHexadecimal(value, bits, withPrefix = true) {

    if (isNaN(value))
        return `NaN`;

    let str = Number(value).toString(HEX_BASE).toLowerCase();

    if (typeof bits !== `undefined`)
        while (str.length < Math.ceil(bits / BITS_PER_HEX_CHAR))
            str = `0` + str; // eslint-disable-line prefer-template

    if (withPrefix)
        str = `0x` + str; // eslint-disable-line prefer-template

    return str;

}

export function formatBinary(value, bits, withPrefix = true) {

    if (isNaN(value))
        return `NaN`;

    let str = Number(value).toString(2);

    if (typeof bits !== `undefined`)
        while (str.length < bits)
            str = `0` + str; // eslint-disable-line prefer-template

    if (withPrefix)
        str = `0b` + str; // eslint-disable-line prefer-template

    return str;

}
