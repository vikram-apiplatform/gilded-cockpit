import {PropertyBase} from './property-base';

export class DropdownProperty extends PropertyBase<string> {

    controlType = 'dropdown';
    options: {key: string, value: string}[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];

    }

}
