import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {FilterPipe} from '../../../filter.pipe';
import {CsvService} from '../../../csv.service';

@Component({
    selector: 'app-chart-drill-down',
    templateUrl: './chart-drill-down.component.html',
    styleUrls: ['./chart-drill-down.component.scss']
})
export class ChartDrillDownComponent implements OnInit {

    @Input() data: any;
    @Input() title: any;
    @Input() isDrillDown = true;
    @Output() hideDetails: EventEmitter<any> = new EventEmitter<any>();
    itemList = [];
    filterData: any[];
    columns = [];
    settings = {text: 'Select attribute(s) to search instantly'};

    dropdownList = [];
    dropdownSettings: IDropdownSettings;
    searchText = '';
    filteredData = [];
    filterPipe = new FilterPipe();

    constructor(public _csvService: CsvService) {
    }

    ngOnInit() {
        this.filteredData = this.data;
        this.itemList = [];
        this.columns = Object.keys(this.data[0]);
        for (let t = 0; t < this.columns.length; t++) {
            const tempObj = {};
            tempObj['id'] = t;
            tempObj['itemName'] = this.columns[t];
            this.itemList.push(tempObj);
            this.dropdownList.push({item_id: t, item_text: this.columns[t]})
        }

        // this.dropdownList = [
        //     {item_id: 1, item_text: 'Mumbai'},
        //     {item_id: 2, item_text: 'Bangaluru'},
        //     {item_id: 3, item_text: 'Pune'},
        //     {item_id: 4, item_text: 'Navsari'},
        //     {item_id: 5, item_text: 'New Delhi'}
        // ];
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true
        };
    }

    getKeys(obj) {
        return Object.keys(obj);
    }

    getClass(className, index) {
        index += 1;
        return className + ' ' + 'column' + index
    }

    hideDrillDownDetails() {
        this.hideDetails.emit();
    }

    getType(data) {
        return typeof data;
    }

    getActualData(data, key, title, recordIndex) {
        if (this.getType(data) === 'object') {
            // switch (title) {
            //     case 'Gold Vaults':
            //         if (key === 'barLocation') {
            //             return data[0].location
            //         } else if (key === 'barRefinery') {
            //             return data[0].refinery
            //         }
            //         break;
            // }
            if (key === 'barLocation') {
                this.filteredData[recordIndex][key] = data[0].location;
                return data[0].location
            } else if (key === 'barRefinery') {
                this.filteredData[recordIndex][key] = data[0].refinery;
                return data[0].refinery
            }
            //return JSON.stringify(data);
        }
        return data;
    }

    checkFilter() {
        if (!this.filterData || this.filterData === [] || this.filterData === null) {
            alert('Please select an attribute to filter.');
            this.searchText = '';
        } else {
            let data = this.filterPipe.transform(this.data, this.searchText, this.filterData);
            if (data && data.length) {
                this.filteredData = data;
            }
        }
    }

    download() {
        this._csvService.downloadFile(this.filteredData, 'csv', this.columns);
    }

}
