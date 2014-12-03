import { formatAddress } from './FormatUtils';

export function memset( destination, value, offset, size ) {

    for ( var t = 0; t < size; ++ t )
        destination[ offset + t ] = value;

    return destination;

}
