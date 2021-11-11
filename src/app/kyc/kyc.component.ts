import {Component, OnInit} from '@angular/core';
import {APIService} from '../api.service';

@Component({
    selector: 'app-kyc',
    templateUrl: './kyc.component.html',
    styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {

    kycDetails: any;
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
    attemptsChartHeader = 'Attempts Status';
    isDataloading = true;
    showDrillDown = false;
    drillDownData = [];

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
                            break;
                        case 'failed':
                            this.statusChartData[1].value += 1;
                            this.statusChartData[1].records.push(kyc);
                            break;
                        case 'notAttempted':
                            this.statusChartData[2].value += 1;
                            this.statusChartData[2].records.push(kyc);
                            break;
                    }
                    if (kyc.status === 'failed') {
                        switch (kyc.noOfAttempts) {
                            case 1:
                                this.attemptsChartData[0].value += 1;
                                break;
                            case 2:
                                this.attemptsChartData[1].value += 1;
                                break;
                            case 3:
                                this.attemptsChartData[2].value += 1;
                                break;
                            case 4:
                                this.attemptsChartData[3].value += 1;
                                break;
                            case 5:
                                this.attemptsChartData[4].value += 1;
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
        this.drillDownData = data[0].records;
        console.log(this.drillDownData);
        this.showDrillDown = true;
    }

    hideDrillDownDetails() {
        this.showDrillDown = false;
    }

}
