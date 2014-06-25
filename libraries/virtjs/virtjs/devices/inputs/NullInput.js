import { EmitterMixin } from '../../mixins/EmitterMixin';
import { mixin }        from '../../utils/ObjectUtils';

export class NullInput extends mixin( null, EmitterMixin ) {

};
