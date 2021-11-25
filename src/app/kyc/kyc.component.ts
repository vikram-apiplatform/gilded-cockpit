import {Component, OnInit} from '@angular/core';
import {APIService} from '../api.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-kyc',
    templateUrl: './kyc.component.html',
    styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {

    kycDetails: any;
    env = environment;
    statusChartData = [
        {
            name: 'Passed',
            value: 0,
            records: []
        },
        {
            name: 'Failed',
            value: 0,
            records: []
        },
        {
            name: 'Not attempted',
            value: 0,
            records: []
        }
    ];
    attemptsChartData = [
        {
            name: 'Attempts: 1',
            value: 0,
            records: []
        },
        {
            name: 'Attempts: 2',
            value: 0,
            records: []
        },
        {
            name: 'Attempts: 3',
            value: 0,
            records: []
        },
        {
            name: 'Attempts: 4',
            value: 0,
            records: []
        },
        {
            name: 'Attempts: 5',
            value: 0,
            records: []
        }
    ];
    statusChartHeader = 'KYC Status';
    attemptsChartHeader = 'No. Of Attempts';
    attemptsColorScheme = {
        domain: ['#ff6b6b', '#ff5252', '#ff3838', '#ff1f1f', '#ff0505']
    };
    isDataloading = true;
    showDrillDown = false;
    drillDownData = [];
    drillDownTitle = '';

    constructor(public apiService: APIService) {
    }

    ngOnInit() {
        this.getKYC()
    }

    getKYC() {
        this.apiService.getKYCDetails().subscribe(response => {
            this.kycDetails = response;
            console.log(this.kycDetails);
            if (this.kycDetails && this.kycDetails.length) {
                for (const kyc of this.kycDetails) {
                    switch (kyc.status) {
                        case 'passed':
                            this.statusChartData[0].value += 1;
                            this.statusChartData[0].records.push(kyc);
                            this.statusChartData[0]['query'] = 'status=passed';
                            break;
                        case 'failed':
                            this.statusChartData[1].value += 1;
                            this.statusChartData[1].records.push(kyc);
                            this.statusChartData[0]['query'] = 'status=failed';
                            break;
                        case 'notAttempted':
                            this.statusChartData[2].value += 1;
                            this.statusChartData[2].records.push(kyc);
                            this.statusChartData[0]['query'] = 'status=notAttempted';
                            break;
                    }
                    if (kyc.status === 'failed') {
                        switch (kyc.noOfAttempts) {
                            case 1:
                                this.attemptsChartData[0].value += 1;
                                this.attemptsChartData[0].records.push(kyc);
                                this.statusChartData[0]['query'] = 'noOfAttempts=1';
                                break;
                            case 2:
                                this.attemptsChartData[1].value += 1;
                                this.attemptsChartData[1].records.push(kyc);
                                this.statusChartData[0]['query'] = 'noOfAttempts=2';
                                break;
                            case 3:
                                this.attemptsChartData[2].value += 1;
                                this.attemptsChartData[2].records.push(kyc);
                                this.statusChartData[0]['query'] = 'noOfAttempts=3';
                                break;
                            case 4:
                                this.attemptsChartData[3].value += 1;
                                this.attemptsChartData[3].records.push(kyc);
                                this.statusChartData[0]['query'] = 'noOfAttempts=4';
                                break;
                            case 5:
                                this.attemptsChartData[4].value += 1;
                                this.attemptsChartData[4].records.push(kyc);
                                this.statusChartData[0]['query'] = 'noOfAttempts=5';
                                break;
                        }
                    }
                }
                this.isDataloading = false;
                console.log(this.statusChartData);
                console.log(this.attemptsChartData);
            }
        })
    }

    getKeys(obj) {
        return Object.keys(obj);
    }

    showDrillDownDetails(data) {
        this.drillDownData = data.records;
        console.log(this.drillDownData);
        this.drillDownTitle = data.title;
        this.showDrillDown = true;
    }

    hideDrillDownDetails() {
        this.showDrillDown = false;
    }

    applyFilters(params) {
        const url = environment.kycUrl + params;
        this.apiService.getData(url).subscribe(response => {
            console.log(response);
            this.kycDetails = response;
        })
    }

}
