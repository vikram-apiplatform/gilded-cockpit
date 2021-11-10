import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {GadgetInstanceService} from '../../grid/grid.service';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetBase} from '../_common/gadget-base';
import {GoldService} from './service';
import {Router} from '@angular/router';
import {OptionsService} from '../../configuration/tab-options/service';

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-gadget.css']
})

export class GoldInventoryGadgetComponent extends GadgetBase {

    // chart options
    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = true;
    showXAxisLabel = true;
    showYAxisLabel = true;
    yAxisLabel = 'Gold bars';
    xAxisLabel = 'Percent Utilization';
    view: any[];
    cpu: any[] = [];
    barData: any;
    colorScheme: any = {
        domain: ['black', '#ffd700']
    };


    constructor(protected _runtimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                protected _goldService: GoldService,
                private _changeDetectionRef: ChangeDetectorRef,
                protected _optionsService: OptionsService,
                private _route: Router) {
        super(_runtimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef,
            _optionsService);

    }

    public preRun(): void {

        this.run();
    }

    public run() {

        this.cpu = [];
        this.initializeRunState(true);
        this.updateData(null);

    }

    public stop() {
        this.setStopState(false);
    }


    populateGoldBarsData() {
        let chartData = [];
        for (const bar of this.barData) {
            chartData.push({
                'name': bar.serialNumber,
                'series': [
                    {
                        'name': 'used',
                        'value': Number(bar.barWeight) - Number(bar.pendingWeight),
                        'data': bar
                    },
                    {
                        'name': 'available',
                        'value': Number(bar.pendingWeight),
                        'data': bar
                    }
                ]
            })
        }
        this.cpu = chartData
    }

    populateGoldLocationsData() {
        let chartData = [];
        let goldBarsLocations: any;
        return new Promise((resolve, reject) => {
            this._goldService.getGoldBarsLocations().subscribe(response => {
                goldBarsLocations = response;
                if (goldBarsLocations && goldBarsLocations.length) {
                    let bars: any;
                    let count = 0;
                    for (const goldBarsLocation of goldBarsLocations) {
                        this._goldService.getGoldBarsDataWithParams('barLocationId=' + goldBarsLocation.id).subscribe(resp => {
                            console.log(resp);
                            let available = 0;
                            let used = 0;
                            bars = resp;
                            if (bars && bars.length) {
                                for (const bar of bars) {
                                    available += Number(bar.pendingWeight);
                                    used += Number(bar.barWeight) - Number(bar.pendingWeight);
                                }
                                chartData.push({
                                    'name': goldBarsLocation.location,
                                    'series': [
                                        {
                                            'name': 'used',
                                            'value': used
                                        },
                                        {
                                            'name': 'available',
                                            'value': available
                                        }
                                    ]
                                })
                            }
                            count += 1;
                            if (count === goldBarsLocations.length) {
                                resolve(chartData);
                                this.cpu = chartData;
                            }
                        })
                    }
                    // console.log(chartData);
                    // this.cpu = chartData;
                }
            }, error => {
                reject(error);
            })
        })
    }

    populateGoldRefineriesData() {
        let chartData = [];
        let goldBarRefineries: any;
        return new Promise((resolve, reject) => {
            this._goldService.getGoldBarsRefineries().subscribe(response => {
                goldBarRefineries = response;
                if (goldBarRefineries && goldBarRefineries.length) {
                    let bars: any;
                    let count = 0;
                    for (const goldBarRefinery of goldBarRefineries) {
                        this._goldService.getGoldBarsDataWithParams('barRefineryId=' + goldBarRefinery.id).subscribe(resp => {
                            console.log(resp);
                            let available = 0;
                            let used = 0;
                            bars = resp;
                            if (bars && bars.length) {
                                for (const bar of bars) {
                                    available += Number(bar.pendingWeight);
                                    used += Number(bar.barWeight) - Number(bar.pendingWeight);
                                }
                                chartData.push({
                                    'name': goldBarRefinery.refinery,
                                    'series': [
                                        {
                                            'name': 'used',
                                            'value': used
                                        },
                                        {
                                            'name': 'available',
                                            'value': available
                                        }
                                    ]
                                })
                            }
                            count += 1;
                            if (count === goldBarRefineries.length) {
                                resolve(chartData);
                                this.cpu = chartData;
                            }
                        })
                    }
                    // console.log(chartData);
                    // this.cpu = chartData;
                }
            }, error => {
                reject(error);
            })
        })
    }

    public updateData(data: any[]) {

        // this._goldService.getMockData().subscribe(cpu => {
        //
        //         Object.assign(this, {cpu});
        //
        //     },
        //     error => this.handleError(error));
        console.log(this.title);
        console.log(this.config);
        let chartData = [
            {
                'name': 'Gold bar 1',
                'series': [
                    {
                        'name': 'used',
                        'value': 45
                    },
                    {
                        'name': 'available',
                        'value': 55
                    }
                ]
            },
            {
                'name': 'Gold bar 2',
                'series': [
                    {
                        'name': 'used',
                        'value': 23
                    },
                    {
                        'name': 'available',
                        'value': 77
                    }
                ]
            },
            {
                'name': 'Gold bar 3',
                'series': [
                    {
                        'name': 'used',
                        'value': 7
                    },
                    {
                        'name': 'available',
                        'value': 93
                    }
                ]
            }
        ];
        this.cpu = chartData;
        this._goldService.getGoldBarsData().subscribe(async response => {
            console.log(response);
            this.barData = response;
            if (this.barData && this.barData.length) {
                switch (this.title) {
                    case 'Gold Bars':
                        this.populateGoldBarsData();
                        break;
                    case 'Gold Locations':
                        await this.populateGoldLocationsData();
                        this.yAxisLabel = 'Gold Vault';
                        break;
                    case 'Gold Refineries':
                        await this.populateGoldRefineriesData();
                        this.yAxisLabel = 'Gold Refineries';

                }
            }
        });
    }

    public drillDown(data) {
        this._route.navigate(['/detail'], {queryParams: {data: JSON.stringify(data)}});
    }

    public updateProperties(updatedProperties: any) {

        /**
         * todo
         *  A similar operation exists on the procmman-config-service
         *  whenever the property page form is saved, the in memory board model
         *  is updated as well as the gadget instance properties
         *  which is what the code below does. This can be eliminated with code added to the
         *  config service or the property page service.
         *
         * **/

        const updatedPropsObject = JSON.parse(updatedProperties);

        this.propertyPages.forEach(function (propertyPage) {


            for (let x = 0; x < propertyPage.properties.length; x++) {

                for (const prop in updatedPropsObject) {
                    if (updatedPropsObject.hasOwnProperty(prop)) {
                        if (prop === propertyPage.properties[x].key) {
                            propertyPage.properties[x].value = updatedPropsObject[prop];
                        }

                    }
                }
            }
        });

        this.title = updatedPropsObject.title;
        this.showXAxis = updatedPropsObject.chart_properties;
        this.showYAxis = updatedPropsObject.chart_properties;
        this.gradient = updatedPropsObject.chart_properties;
        this.showLegend = updatedPropsObject.chart_properties;
        this.showXAxisLabel = updatedPropsObject.chart_properties;
        this.showYAxisLabel = updatedPropsObject.chart_properties;

        this.setEndPoint(updatedPropsObject.endpoint);

        this.showOperationControls = true;

    }

}
