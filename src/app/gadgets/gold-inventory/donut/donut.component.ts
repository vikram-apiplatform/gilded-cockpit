import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {RuntimeService} from '../../../services/runtime.service';
import {GadgetInstanceService} from '../../../grid/grid.service';
import {GadgetPropertyService} from '../../_common/gadget-property.service';
import {EndPointService} from '../../../configuration/tab-endpoint/endpoint.service';
import {DonutService} from '../../donut/service';
import {APITokenService} from '../../../api-token/api-token.service';
import {OptionsService} from '../../../configuration/tab-options/service';
import {GadgetBase} from '../../_common/gadget-base';
import {
    style, state, trigger, animate, transition
} from '@angular/animations';

@Component({
    selector: 'app-donut',
    templateUrl: './donut.component.html',
    styleUrls: ['./donut.component.css'],
    animations: [

        trigger('accordion', [
            state('in', style({
                height: '*'
            })),
            state('out', style({
                opacity: '0',
                height: '0px'
            })),
            transition('in => out', animate('700ms ease-in-out')),
            transition('out => in', animate('300ms ease-in-out'))
        ]),
        trigger('accordion2', [
            state('in', style({
                height: '*'
            })),
            state('out', style({
                opacity: '0',
                height: '0px'
            })),
            transition('in => out', animate('300ms ease-in-out')),
            transition('out => in', animate('800ms ease-in-out'))
        ])
    ]
})
export class DonutComponent implements OnDestroy {

    topic: any;
    // @Input() data = [
    //     {
    //         'name': 'Germany',
    //         'value': 8940000
    //     },
    //     {
    //         'name': 'USA',
    //         'value': 5000000
    //     }
    // ];
    @Input() data = [];
    @Input() header = '';
    @Output() drillDown: EventEmitter<any> = new EventEmitter<any>();
    colorScheme = {
        domain: ['#0cd057', '#ef5350', '#00acc1']
    };
    detailMenuOpen: string;
    donutServiceSubscription: any;

    // gadget properties
    autoCompliance: boolean;
    complianceFrequency: number;

    constructor(protected _runtimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                protected _changeDetectionRef: ChangeDetectorRef,
                protected _donutService: DonutService,
                protected  _apiTokenService: APITokenService,
                protected _optionsService: OptionsService) {
        // super(_runtimeService,
        //     _gadgetInstanceService,
        //     _propertyService,
        //     _endPointService,
        //     _changeDetectionRef,
        //     _optionsService);
    }

    public preRun(): void {

        // this.setTopic();
        // this.setProperties();
        // this.run();

    }

    public run() {

        // this.initializeRunState(true);
        // this.updateData(null);
    }

    public stop() {

        // if (this.donutServiceSubscription) {
        //   this.donutServiceSubscription.unsubscribe();
        // }
        // this.setStopState(false);
    }


    public updateData(data: any[]) {

        // this.donutServiceSubscription = this._donutService.poll().subscribe(donutData => {
        //
        //   const me = this;
        //
        //   this._donutService.get().subscribe(_data => {
        //
        //         me.data = _data;
        //       },
        //       error => this.handleError(error));
        // });
    }


    public updateProperties(updatedProperties: any) {

        // const updatedPropsObject = JSON.parse(updatedProperties);
        //
        // this.propertyPages.forEach(function (propertyPage) {
        //
        //
        //   for (let x = 0; x < propertyPage.properties.length; x++) {
        //
        //     for (const prop in updatedPropsObject) {
        //       if (updatedPropsObject.hasOwnProperty(prop)) {
        //         if (prop === propertyPage.properties[x].key) {
        //           propertyPage.properties[x].value = updatedPropsObject[prop];
        //         }
        //
        //       }
        //     }
        //   }
        // });
        //
        // this.title = updatedPropsObject.title;
        // this.autoCompliance = updatedPropsObject.auto;
        // this.complianceFrequency = updatedPropsObject.frequency;
        // this.showOperationControls = true;
        //
        // this.setEndPoint(updatedPropsObject.endpoint);

    }

    setTopic() {
        this._donutService.getHelpTopic().subscribe(data => {
            this.topic = data;
        });
    }

    public setProperties() {

        //this.title = this.getPropFromPropertyPages('title');
        this.detailMenuOpen = 'out';
    }


    toggleAccordion(): void {

        this.detailMenuOpen = this.detailMenuOpen === 'out' ? 'in' : 'out';

    }

    showDrillDown(filteredData) {
        console.log(this.data);
        console.log(filteredData);
        const selectedData = this.data.filter(e => e.name === filteredData.name);
        console.log(selectedData);
        this.drillDown.emit(selectedData);
    }

    public ngOnDestroy() {

        this.stop();

    }

}
