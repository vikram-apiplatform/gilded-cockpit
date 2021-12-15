import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {FilterPipe} from '../../../filter.pipe';
import {CsvService} from '../../../csv.service';
import {APIService} from '../../../api.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {RDCResultCodes} from '../../../../assets/data/rdc-result-codes';

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
    @Input() type: any;
    @Output() hideDetails: EventEmitter<any> = new EventEmitter<any>();
    @Output() queryFilters: EventEmitter<any> = new EventEmitter<any>();
    @Output() viewExpandedTable: EventEmitter<any> = new EventEmitter<any>();
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
    @Input() showExpansionPanel = {};
    showAttributesFilter = false;
    startDate: any;
    endDate: any;
    today: any = new Date();
    minStartDate = '2015-01-01';
    minEndDate = '2015-01-01';
    maxEndDate: any = new Date();
    currentOffset = 0;
    limit = 10;
    page = 1;
    itemsPerPage = 10;
    collectionSize: any;
    tempCollectionSize: any;
    currentPageDisplayed = 1;
    selectedItemsPerPageIndex = 1;
    isAllRecordsFetched = false;
    isDataLoading = true;
    queryParams = ''
    showChipSelector = false;
    filterLoading = true;
    filterQueryContainerPos = '300px';
    lastSortedKey = '';
    lastSortedOrder = 'desc';
    readonly separatorKeysCodes = [ENTER, COMMA];

    constructor(public _csvService: CsvService, public apiService: APIService) {
    }

    async ngOnInit() {
        await this.getData();
        //this.filteredData = this.data;
        this.populateFilters();
        this.populateQueryFiltersData();

        // this.dropdownList = [
        //     {item_id: 1, item_text: 'Mumbai'},
        //     {item_id: 2, item_text: 'Bangaluru'},
        //     {item_id: 3, item_text: 'Pune'},
        //     {item_id: 4, item_text: 'Navsari'},
        //     {item_id: 5, item_text: 'New Delhi'}
        // ];
        //this.collectionSize = this.data.length;
        //this.tempCollectionSize = this.filteredData.length;
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: true
        };
        this.attributesDropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
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

    getData(url = '') {
        this.isDataLoading = true;
        return new Promise((resolve, reject) => {
            if (url === '') {
                url = this.apiUrl + '?pagination=true&offset=' + this.currentOffset + '&limit=' + this.limit;
            } else {
                url += '&pagination=true&offset=' + this.currentOffset + '&limit=' + this.limit;
            }
            //url = this.apiUrl + '?pagination=true&offset=' + this.currentOffset + '&limit=' + this.limit;

            this.apiService.getData(url).subscribe(response => {
                let items: any;
                items = response;
                console.log(items);
                if (items && items.length > 0) {
                    this.data = items[0].data;
                    this.filteredData = items[0].data;
                    this.collectionSize = items[0]._pages.totalRows;
                } else {
                    this.filteredData = [];
                    this.collectionSize = 0;
                }
                this.isDataLoading = false;
                //this.populateQueryFiltersData();
                resolve(true);
            }, error => {
                this.isDataLoading = false;
                resolve(error);
            })
        })
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
            this.showExpansionPanel[i] = 'show-btn';
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
        if (key === 'kyc_check_count') {
            return 'KYC Attempts'
        }
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
            this.queryFilterData[key].dropdownList = [];
            if (!this.queryFilterData[key].dropdownList.length) {
                if (this.type === 'aml') {
                    this.filterLoading = false;
                    this.showChipSelector = true;
                    Object.keys(this.showQueryFilter).forEach(queryKey => {
                        this.showQueryFilter[queryKey] = false
                    });
                    this.showQueryFilter[key] = true;
                } else {
                    this.filterLoading = true;
                    Object.keys(this.showQueryFilter).forEach(queryKey => {
                        this.showQueryFilter[queryKey] = false
                    });
                    this.showQueryFilter[key] = true;
                    this.apiService.getAttributeValues(key, this.type).subscribe(response => {
                        let attributeValues: any;
                        attributeValues = response;
                        if (attributeValues && attributeValues.length && attributeValues.length < 10000) {
                            for (let i = 0; i < attributeValues.length; i++) {
                                let keys = Object.keys(attributeValues[i]);
                                if (key === 'is_kyc_verified') {
                                    if (attributeValues[i][keys[0]]) {
                                        this.queryFilterData[key].dropdownList.push({item_id: i, item_text: 'Pass'});
                                    } else if (attributeValues[i][keys[0]] === 0) {
                                        this.queryFilterData[key].dropdownList.push({item_id: i, item_text: 'Fail'});
                                    } else {
                                        if (attributeValues[i][keys[0]] !== null) {
                                            this.queryFilterData[key].dropdownList.push({
                                                item_id: i,
                                                item_text: attributeValues[i][keys[0]]
                                            });
                                        }
                                    }
                                } else {
                                    if (attributeValues[i][keys[0]] !== null) {
                                        this.queryFilterData[key].dropdownList.push({item_id: i, item_text: attributeValues[i][keys[0]]});
                                    }
                                }
                            }
                            this.showChipSelector = false;
                        } else {
                            this.showChipSelector = true;
                        }
                        this.filterLoading = false;

                    });
                }
            }
            const filterPos = document.getElementById('data-table');
            // $('.filter-query-container').css({'left': filterPos.offsetLeft})
            // $('.filter-query-container').css({'top': '50rem !important'});
        } else {
            this.showQueryFilter[key] = false;
        }
    }

    getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }

    getQueryFilterStyle(i) {
        //return (-i * (this.itemList.length - i * 0.1) + 'rem');
        //return (-i * 1.8) + 'rem';
        const table = document.getElementById('data-table');
        const filter = document.getElementById(this.itemList[i]);
        let leftPos = filter.offsetLeft
        if (leftPos + 350 > table.offsetWidth) {
            while (leftPos + 350 > table.offsetWidth) {
                leftPos -= 1;
            }
            leftPos = -leftPos;
        }
        if (this.getOffset(filter).left + 350 > table.offsetWidth) {
            return (-((this.getOffset(filter).left + 350) - table.offsetWidth) + 'px');
        }
        return ('0px');
        //return (this.getOffset(filter).left + 'px');
        //return (leftPos + 'px');
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
                if (key === 'is_kyc_verified') {
                    if (this.queryFilterData[key].filterData[i].item_text === 'Pass') {
                        queryParams += 1;
                    } else if (this.queryFilterData[key].filterData[i].item_text === 'Fail') {
                        queryParams += 0;
                    } else {
                        queryParams += this.queryFilterData[key].filterData[i].item_text;
                    }
                } else {
                    queryParams += this.queryFilterData[key].filterData[i].item_text;
                }
                if (i + 1 !== this.queryFilterData[key].filterData.length) {
                    queryParams += ',';
                }
                //tempFilteredData = tempFilteredData.concat(this.filterPipe.transform(orig_data, searchText.item_text, tempObj));
            }
        }
        this.queryParams = queryParams;
        this.currentOffset = 0;
        this.currentPageDisplayed = 1;
        this.page = 1;
        console.log(this.startDate);
        console.log(this.endDate);
        if (this.startDate && this.endDate) {
            this.applyDateFilters();
        } else {
            this.getData(this.apiUrl + queryParams);
        }
        //this.queryFilters.emit(queryParams);
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
        this.itemList.push(attribute.item_text);
    }

    onAttributeDeSelect(attribute) {
        this.itemList = this.itemList.filter(item => item !== attribute.item_text);
    }

    onAttributeSelectAll(attribute) {
        this.itemList = this.columns;
    }

    onAttributeDeSelectAll(attribute) {
        this.itemList = [];
    }

    // getStatusClass(status){
    //     switch(status){
    //         case 'passed':
    //     }
    // }

    toggleExpansionPanel(index) {
        if (this.showExpansionPanel[index] === 'show-btn') {
            this.viewExpandedTable.emit({record: this.filteredData[index], index: index});
        } else {
            this.showExpansionPanel[index] = 'show-btn';
        }
        // this.showExpansionPanel[index] = !this.showExpansionPanel[index];
    }

    toggleAttributesFilter() {
        this.showAttributesFilter = !this.showAttributesFilter;
    }

    showDocuments(historyRecord, userRecord) {
        this.viewDocuments.emit({historyRecord: historyRecord, userRecord: userRecord});
    }

    showRemediations(record) {
        this.viewRemediations.emit(record);
    }


    addQuery(event: MatChipInputEvent, key) {
        const value = (event.value || '').trim();
        this.queryFilterData[key].dropdownList.push({item_id: this.queryFilterData[key].dropdownList.length, item_text: value})
        this.queryFilterData[key].filterData.push({item_id: this.queryFilterData[key].filterData.length, item_text: value})
        event.input.value = '';
    }

    removeQuery(key, index) {
        this.queryFilterData[key].dropdownList.splice(index, 1);
        this.queryFilterData[key].filterData.splice(index, 1);
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
            this.applyQueryFilters('', false);
        }
        this.minEndDate = this.startDate;
    }

    selectEndDate() {
        if ((this.startDate !== '' && this.startDate !== undefined) && (this.endDate !== '' && this.endDate !== undefined)) {
            this.applyDateFilters();
        }
        if (this.endDate === '' || this.endDate === undefined) {
            this.filteredData = this.data;
            this.applyQueryFilters('', false);
        }
    }

    applyDateFilters() {
        // let dateFilteredData = [];
        // for (let i = 0; i < this.data.length; i++) {
        //     let date_created = this.data[i]['date_created'];
        //     date_created = date_created.slice(0, 10);
        //     if (date_created >= this.startDate && date_created <= this.endDate) {
        //         dateFilteredData.push(this.data[i]);
        //     }
        // }
        // this.filterData = [];
        // this.filteredData = dateFilteredData;

        let fromDate = this.startDate + 'T00:00:00';
        let toDate = this.endDate + 'T23:59:59';
        let dateFilteredData: any = [];
        let params = '';
        if (this.queryParams !== '') {
            //params = this.queryParams;
            params += '&date_created.gt=' + fromDate + '&date_created.lt=' + toDate;
            this.queryParams += params;
        } else {
            params += '?date_created.gt=' + fromDate + '&date_created.lt=' + toDate
            this.queryParams = params;
        }
        this.currentOffset = 0;
        this.getData(this.apiUrl + this.queryParams);
        // this.apiService.getData(this.apiUrl + '?date_created.gt=' + fromDate + '&date_created.lt=' + toDate).subscribe(response => {
        //     dateFilteredData = response;
        //     this.filteredData = [];
        //     this.filteredData = dateFilteredData;
        // });

    }

    sortByKey(key) {
        let params = '';
        if (this.lastSortedOrder === 'desc') {
            if (this.queryParams !== '') {
                params = this.queryParams + '&sort=+' + key;
            } else {
                params = '?sort=+' + key;
            }
            this.lastSortedOrder = 'asc';
        } else {
            if (this.queryParams !== '') {
                params = this.queryParams + '&sort=-' + key;
            } else {
                params = '?sort=-' + key;
            }
            this.lastSortedOrder = 'desc';
        }
        //this.queryParams = params;
        this.lastSortedKey = key;
        //this.currentOffset = 0;
        //this.page = 1;
        this.getData(this.apiUrl + params);
    }

    getRDCCodes(codes) {
        return codes.split('; ');
    }

    getRDCCodeValue(code) {
        const codes = code.split(':');
        let value = '';
        for (const rdcCode of codes) {
            if (RDCResultCodes[rdcCode]) {
                value += rdcCode + ': (' + RDCResultCodes[rdcCode].value + ')\n\n';
                // value += RDCResultCodes[rdcCode].value + '\n';
                value += RDCResultCodes[rdcCode].description + '\n\n\n';
            }
        }

        // return `${codes[0]}:\n
        // ${RDCResultCodes[codes[0]] ? RDCResultCodes[codes[0]].value : ''}
        // ${RDCResultCodes[codes[0]] ? RDCResultCodes[codes[0]].description : ''}
        //
        //
        // ${codes[1]}:
        // ${RDCResultCodes[codes[1]] ? RDCResultCodes[codes[1]].value : ''}
        // ${RDCResultCodes[codes[1]] ? RDCResultCodes[codes[1]].description : ''}
        // `

        return value;
    }

    lastPage() {
        this.currentOffset = (this.page - 1) * this.itemsPerPage;
        this.limit = this.itemsPerPage;
        if (this.queryParams === '') {
            if (this.lastSortedKey === '') {
                this.getData();
            } else {
                this.lastSortedOrder === 'asc' ? this.lastSortedOrder = 'desc' : this.lastSortedOrder = 'asc'
                this.sortByKey(this.lastSortedKey);
            }
        } else {
            if (this.lastSortedKey === '') {
                this.getData(this.apiUrl + this.queryParams);
            } else {
                this.lastSortedOrder === 'asc' ? this.lastSortedOrder = 'desc' : this.lastSortedOrder = 'asc'
                this.sortByKey(this.lastSortedKey);
            }
        }
        Object.keys(this.showExpansionPanel).forEach(index => {
            this.showExpansionPanel[index] = 'show-btn';
        });
        this.currentPageDisplayed = 1;
        //this.currentPageDisplayed = this.page;
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
