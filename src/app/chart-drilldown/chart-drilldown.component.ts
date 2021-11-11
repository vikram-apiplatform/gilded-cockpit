import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-chart-drilldown',
    templateUrl: './chart-drilldown.component.html',
    styleUrls: ['./chart-drilldown.component.css']
})
export class ChartDrilldownComponent implements OnInit {

    @Input() data: any;
    @Input() title: any;
    @Input() isDrillDown = true;
    @Output() hideDetails: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
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
}
