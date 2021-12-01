import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-barchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.scss', '../../_common/styles-gadget.css']
})
export class BarchartComponent implements OnInit {

    @Input() data = [
        {
            'name': 'Germany',
            'value': 8940000
        },
        {
            'name': 'USA',
            'value': 5000000
        }
    ];
    @Input() header = '';
    @Input() xAxisLabel = '';
    @Input() yAxisLabel = '';
    @Input() view: any[];
    @Input() colorScheme = {
        domain: ['#0cd057', '#ff3838', '#00acc1']
    };
    gradient = false;
    @Output() drillDown: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    showDrillDown(filteredData) {
        console.log(this.data);
        console.log(filteredData);
        const selectedData = this.data.filter(e => e.name === filteredData.name);
        console.log(selectedData);
        //selectedData[0]['title'] = this.header;
        this.drillDown.emit(selectedData[0]);
    }

}
