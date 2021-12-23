import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'filterByRole'
})
export class FilterPipe implements PipeTransform {
    transform(value: any, searchText: any, arg1: any[]): any {
        if (!searchText) {
            return value;
        }
        return value.filter((data) => this.matchValue(data, searchText, arg1));
    }

    matchValue(data, value, arg1) {
        return arg1.map((keyParams) => {
            return new RegExp(value, 'gi').test(data[keyParams.item_text]);
        }).some(result => result);
    }
}
