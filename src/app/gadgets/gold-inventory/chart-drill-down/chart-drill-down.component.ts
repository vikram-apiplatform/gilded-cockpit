import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {FilterPipe} from '../../../filter.pipe';
import {CsvService} from '../../../csv.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

declare let $;

@Component({
    selector: 'app-chart-drill-down',
    templateUrl: './chart-drill-down.component.html',
    styleUrls: ['./chart-drill-down.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ChartDrillDownComponent implements OnInit, OnChanges {

    @Input() data: any;
    @Input() title: any;
    @Input() isDrillDown = true;
    @Input() apiUrl: any;
    @Input() includesParams = false;
    @Input() paramsToBePassed = '';
    @Input() kycHistory = [];
    @Input() remediateKey = '';
    @Input() expandKey = '';
    @Input() fields = [];
    @Input() expandedTableFields = [];
    @Input() remediateIdentifiers = [false];
    @Output() hideDetails: EventEmitter<any> = new EventEmitter<any>();
    @Output() queryFilters: EventEmitter<any> = new EventEmitter<any>();
    @Output() viewDocuments: EventEmitter<any> = new EventEmitter<any>();
    @Output() viewRemediations: EventEmitter<any> = new EventEmitter<any>();
    itemList = [];
    filterData: any[];
    settings = {text: 'Select attribute(s) to search instantly'};
    columns = [];
    dropdownList = [];
    dropdownSettings: IDropdownSettings;
    attributesDropdownSettings: IDropdownSettings;
    queryFilterDropdownSettings: IDropdownSettings;
    searchText = '';
    filteredData = [];
    filterPipe = new FilterPipe();
    showQueryFilter = {};
    queryFilterData = {};
    queryFilteredData = [];
    attributesList = [];
    attributesFilter = [];
    expandedElement: any;
    showExpansionPanel = {};
    showAttributesFilter = false;
    startDate: any;
    endDate: any;
    today: any = new Date();
    minStartDate = '2015-01-01';
    minEndDate = '2015-01-01';
    maxEndDate: any = new Date();
    page = 1;
    itemsPerPage = 10;
    collectionSize: any;
    tempCollectionSize: any;
    currentPageDisplayed = 1;
    selectedItemsPerPageIndex = 1;
    isAllRecordsFetched = false;

    constructor(public _csvService: CsvService) {
    }

    ngOnInit() {
        this.filteredData = this.data;
        this.populateFilters();
        this.populateQueryFiltersData();

        // this.dropdownList = [
        //     {item_id: 1, item_text: 'Mumbai'},
        //     {item_id: 2, item_text: 'Bangaluru'},
        //     {item_id: 3, item_text: 'Pune'},
        //     {item_id: 4, item_text: 'Navsari'},
        //     {item_id: 5, item_text: 'New Delhi'}
        // ];
        this.collectionSize = this.data.length;
        this.tempCollectionSize = this.filteredData.length;
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 5,
            allowSearchFilter: true
        };
        this.attributesDropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true
        };
        this.queryFilterDropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            defaultOpen: true,
            allowSearchFilter: true
        };
    }

    populateFilters() {
        //this.queryFilteredData = this.data;
        this.dropdownList = [];
        this.attributesList = [];
        this.attributesFilter = [];
        this.showQueryFilter = {};
        this.queryFilterData = {};
        this.itemList = [];
        this.columns = JSON.parse(JSON.stringify(this.fields));
        for (const key of Object.keys(this.data[0])) {
            if (!this.columns.includes(key)) {
                this.columns.push(key);
            }
        }
        //this.itemList = this.columns;
        for (let t = 0; t < this.columns.length; t++) {
            // const tempObj = {};
            // tempObj['id'] = t;
            // tempObj['itemName'] = this.columns[t];
            // this.itemList.push(tempObj);
            this.dropdownList.push({item_id: t, item_text: this.columns[t]})
            this.attributesList.push({item_id: t, item_text: this.columns[t]})
            if (this.fields && this.fields.length) {
                if (this.fields.includes(this.columns[t])) {
                    this.itemList.push(this.columns[t]);
                    this.attributesFilter.push({item_id: t, item_text: this.columns[t]})
                }
            } else {
                this.itemList.push(this.columns[t]);
                this.attributesFilter.push({item_id: t, item_text: this.columns[t]})
            }
            this.showQueryFilter[this.columns[t]] = false;
            this.queryFilterData[this.columns[t]] = {
                dropdownList: [],
                filterData: []
            }
        }
    }

    ngOnChanges() {
        console.log(this.data);
        this.filteredData = this.data;
        if (this.includesParams) {
            this.populateFilters();
            this.populateQueryFiltersData();
        }
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
                this.populateQueryFiltersData();
            }
        }
    }

    populateQueryFiltersData() {
        for (let i = 0; i < this.filteredData.length; i++) {
            this.showExpansionPanel[i] = false;
            for (const key of Object.keys(this.filteredData[i])) {
                if (!this.queryFilterData[key]) {
                    this.queryFilterData[key] = {
                        dropdownList: [],
                        filterData: []
                    }
                }
                if (!this.queryFilterData[key]['dropdownList'].filter(queryFilter => queryFilter.item_text === this.filteredData[i][key]).length) {
                    this.queryFilterData[key]['dropdownList'].push({item_id: i, item_text: this.filteredData[i][key]});
                }
                // if (!this.queryFilterData[key]['dropdownList'].includes({item_id: i, item_text: this.filteredData[i][key]})) {
                //     this.queryFilterData[key]['dropdownList'].push({item_id: i, item_text: this.filteredData[i][key]});
                // }
            }
        }
    }

    download() {
        this._csvService.downloadFile(this.filteredData, 'KYC Report', this.columns);
    }

    getReadableFormat(key) {
        const formattedKey = key.replace(/([a-z])([A-Z])/g, '$1 $2');
        const words = formattedKey.split(' ');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        let formattedString = words.join(' ');
        if (formattedString.includes('_')) {
            formattedString = formattedString.split('_');
            for (let i = 0; i < formattedString.length; i++) {
                formattedString[i] = formattedString[i][0].toUpperCase() + formattedString[i].substr(1);
            }
            if (formattedString.length > 1) {
                return formattedString.join(' ');
            }
        }
        return formattedString;
    }

    toggleQueryFilter(key) {
        if (!this.showQueryFilter[key]) {
            Object.keys(this.showQueryFilter).forEach(queryKey => {
                this.showQueryFilter[queryKey] = false
            });
            $('.filter-query').css({'top': '5rem !important'});
        }
        this.showQueryFilter[key] = !this.showQueryFilter[key];
    }

    getQueryFilterStyle(i) {
        //return (-i * (this.itemList.length - i * 0.1) + 'rem');
        return (-i * 1.8) + 'rem';
    }

    applyQueryFilters(queryKey, shouldToggleQueryFilter = true) {
        //this.queryFilteredData = [];
        let queryParams = '';
        for (const key of Object.keys(this.queryFilterData)) {
            if (queryParams === '') {
                queryParams += '?';
                if (this.includesParams) {
                    queryParams += this.paramsToBePassed;
                }
            }
            // else {
            //     queryParams += '&';
            // }
            if (this.queryFilterData[key].filterData.length) {
                if (queryParams !== '?') {
                    queryParams += '&';
                }
                // queryParams += key + '.in='
                queryParams += key + '='
            }
            for (let i = 0; i < this.queryFilterData[key].filterData.length; i++) {
                queryParams += this.queryFilterData[key].filterData[i].item_text;
                if (i + 1 !== this.queryFilterData[key].filterData.length) {
                    queryParams += ',';
                }
                //tempFilteredData = tempFilteredData.concat(this.filterPipe.transform(orig_data, searchText.item_text, tempObj));
            }
        }
        console.log(queryParams);
        this.queryFilters.emit(queryParams);
        // console.log(this.queryFilterData);
        // //for (const key of Object.keys(this.queryFilterData)) {
        // const orig_data = this.queryFilteredData.length ? this.queryFilteredData : this.filteredData;
        // //this.queryFilteredData = [];
        // const tempObj = [{item_text: queryKey}]
        // let tempFilteredData = [];
        // for (const searchText of this.queryFilterData[queryKey].filterData) {
        //     tempFilteredData = tempFilteredData.concat(this.filterPipe.transform(orig_data, searchText.item_text, tempObj));
        // }
        // console.log(tempFilteredData);
        // if (tempFilteredData.length) {
        //     //this.queryFilteredData = this.queryFilteredData.concat(tempFilteredData);
        //     this.queryFilteredData = tempFilteredData;
        // }
        //}
        if (shouldToggleQueryFilter) {
            this.toggleQueryFilter(queryKey);
        }
    }

    clearFilter(queryKey, shouldToggleQueryFilter = true) {
        this.queryFilterData[queryKey].filterData = [];
        this.applyQueryFilters(queryKey, shouldToggleQueryFilter);
    }

    onAttributeSelect(attribute) {
        console.log(attribute);
        this.itemList.push(attribute.item_text);
    }

    onAttributeDeSelect(attribute) {
        console.log(attribute);
        this.itemList = this.itemList.filter(item => item !== attribute.item_text);
    }

    onAttributeSelectAll(attribute) {
        console.log(attribute);
        this.itemList = this.columns;
    }

    onAttributeDeSelectAll(attribute) {
        console.log(attribute);
        this.itemList = [];
    }

    // getStatusClass(status){
    //     switch(status){
    //         case 'passed':
    //     }
    // }

    toggleExpansionPanel(index) {
        this.showExpansionPanel[index] = !this.showExpansionPanel[index];
    }

    toggleAttributesFilter() {
        this.showAttributesFilter = !this.showAttributesFilter;
    }

    showDocuments(accNo, attemptNo) {
        this.viewDocuments.emit({accountNumber: accNo, attemptNumber: attemptNo});
    }

    showRemediations(record) {
        this.viewRemediations.emit(record);
    }


    selectStartDate() {
        if (this.endDate !== undefined && this.startDate > this.endDate) {
            this.endDate = '';
        }
        if ((this.startDate !== '' && this.startDate !== undefined) && (this.endDate !== '' && this.endDate !== undefined)) {
            this.applyDateFilters();
        }
        if (this.startDate === '' || this.startDate === undefined) {
            this.filteredData = this.data;
        }
        this.minEndDate = this.startDate;
    }

    selectEndDate() {
        if ((this.startDate !== '' && this.startDate !== undefined) && (this.endDate !== '' && this.endDate !== undefined)) {
            this.applyDateFilters();
        }
        if (this.endDate === '' || this.endDate === undefined) {
            this.filteredData = this.data;
        }
    }

    applyDateFilters() {
        console.log(this.startDate, this.endDate)
        let dateFilteredData = [];
        for (let i = 0; i < this.data.length; i++) {
            let date_created = this.data[i]['date_created'];
            date_created = date_created.slice(0, 10);
            if (date_created >= this.startDate && date_created <= this.endDate) {
                dateFilteredData.push(this.data[i]);
            }
        }
        this.filterData = [];
        console.log('Filtered Data-->', dateFilteredData);
        this.filteredData = dateFilteredData;
    }


    lastPage() {
        this.currentPageDisplayed = this.page;
    }

    setItemsPerPage() {
        switch (this.selectedItemsPerPageIndex) {
            case 1:
                this.itemsPerPage = 10;
                break;
            case 2:
                this.itemsPerPage = 20;
                break;
            case 3:
                this.itemsPerPage = 40;
                break;
            case 4:
                this.itemsPerPage = 60;
                break;
            case 5:
                this.itemsPerPage = 100;
                break;
            default:
                this.itemsPerPage = 10;
        }

        if (this.data && this.data.length && this.searchText === '' && !this.isAllRecordsFetched) {
            this.lastPage();
        }
    }

    getPageSymbol(current: number) {
        return [10, 20, 40, 60, 100][current - 1];
    }

}
