export function memset(destination, value, offset, size) {

    for (let t = 0; t < size; ++t)
        destination[offset + t] = value;

    return destination;

}
