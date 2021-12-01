import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {APIService} from '../api.service';
import {MatDialog} from '@angular/material/dialog';
import {RemediationsComponent} from '../remediations/remediations.component';
import {KycDocumentViewerComponent} from '../kyc/kyc.component';

@Component({
    selector: 'app-aml',
    templateUrl: './aml.component.html',
    styleUrls: ['./aml.component.scss']
})
export class AmlComponent implements OnInit {

    kycDetails: any;
    kycHistory = {};
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
    statusChartHeader = 'AML Status';
    attemptsChartHeader = 'No. Of Attempts';
    attemptsColorScheme = {
        domain: ['#ff6b6b', '#ff5252', '#ff3838', '#ff1f1f', '#ff0505']
    };
    isDataloading = true;
    showDrillDown = false;
    drillDownData: any;
    drillDownTitle = '';
    drillDownQueryParams = '';

    constructor(public apiService: APIService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.drillDownData = [];
        this.getKYC();
        this.getKycHistory();
    }

    getKYC() {
        this.apiService.getKYCDetails().subscribe(response => {
            this.kycDetails = response;
            console.log(this.kycDetails);
            this.attemptsChartData = [];
            let attemptsData = {};
            // if (this.kycDetails && this.kycDetails.length) {
            //     for (const kyc of this.kycDetails) {
            //         switch (kyc.status) {
            //             case 'passed':
            //                 this.statusChartData[0].value += 1;
            //                 this.statusChartData[0].records.push(kyc);
            //                 this.statusChartData[0]['query'] = 'status=passed';
            //                 break;
            //             case 'failed':
            //                 this.statusChartData[1].value += 1;
            //                 this.statusChartData[1].records.push(kyc);
            //                 this.statusChartData[1]['query'] = 'status=failed';
            //                 break;
            //             case 'notAttempted':
            //                 this.statusChartData[2].value += 1;
            //                 this.statusChartData[2].records.push(kyc);
            //                 this.statusChartData[2]['query'] = 'status=notAttempted';
            //                 break;
            //         }
            //         if (kyc.status === 'failed') {
            //             switch (kyc.noOfAttempts) {
            //                 case 1:
            //                     this.attemptsChartData[0].value += 1;
            //                     this.attemptsChartData[0].records.push(kyc);
            //                     this.attemptsChartData[0]['query'] = 'noOfAttempts=1';
            //                     break;
            //                 case 2:
            //                     this.attemptsChartData[1].value += 1;
            //                     this.attemptsChartData[1].records.push(kyc);
            //                     this.attemptsChartData[1]['query'] = 'noOfAttempts=2';
            //                     break;
            //                 case 3:
            //                     this.attemptsChartData[2].value += 1;
            //                     this.attemptsChartData[2].records.push(kyc);
            //                     this.attemptsChartData[2]['query'] = 'noOfAttempts=3';
            //                     break;
            //                 case 4:
            //                     this.attemptsChartData[3].value += 1;
            //                     this.attemptsChartData[3].records.push(kyc);
            //                     this.attemptsChartData[3]['query'] = 'noOfAttempts=4';
            //                     break;
            //                 case 5:
            //                     this.attemptsChartData[4].value += 1;
            //                     this.attemptsChartData[4].records.push(kyc);
            //                     this.attemptsChartData[4]['query'] = 'noOfAttempts=5';
            //                     break;
            //             }
            //         }
            //     }
            //     this.isDataloading = false;
            //     console.log(this.statusChartData);
            //     console.log(this.attemptsChartData);
            // }

            if (this.kycDetails && this.kycDetails.length) {
                for (const kyc of this.kycDetails) {
                    switch (kyc.is_aml_verified) {
                        case true:
                            this.statusChartData[0].value += 1;
                            this.statusChartData[0].records.push(kyc);
                            this.statusChartData[0]['query'] = 'is_aml_verified=true';
                            break;
                        case false:
                            this.statusChartData[1].value += 1;
                            this.statusChartData[1].records.push(kyc);
                            this.statusChartData[1]['query'] = 'is_aml_verified=false';
                            break;
                        case 'passed':
                            this.statusChartData[0].value += 1;
                            this.statusChartData[0].records.push(kyc);
                            this.statusChartData[0]['query'] = 'status=passed';
                            break;
                        case 'failed':
                            this.statusChartData[1].value += 1;
                            this.statusChartData[1].records.push(kyc);
                            this.statusChartData[1]['query'] = 'status=failed';
                            break;
                        case 'notAttempted':
                            this.statusChartData[2].value += 1;
                            this.statusChartData[2].records.push(kyc);
                            this.statusChartData[2]['query'] = 'status=notAttempted';
                            break;
                    }
                    if (kyc.is_kyc_verified === false) {
                        if (attemptsData && attemptsData[kyc.kyc_check_count]) {
                            attemptsData[kyc.kyc_check_count].value += 1;
                            attemptsData[kyc.kyc_check_count].records.push(kyc);
                        } else {
                            const tempObj = {
                                name: kyc.kyc_check_count,
                                value: 0,
                                records: [kyc],
                                query: 'kyc_check_count=' + kyc.kyc_check_count
                            }
                            attemptsData[kyc.kyc_check_count] = tempObj;
                        }
                        switch (kyc.noOfAttempts) {
                            case 1:
                                this.attemptsChartData[0].value += 1;
                                this.attemptsChartData[0].records.push(kyc);
                                this.attemptsChartData[0]['query'] = 'noOfAttempts=1';
                                break;
                            case 2:
                                this.attemptsChartData[1].value += 1;
                                this.attemptsChartData[1].records.push(kyc);
                                this.attemptsChartData[1]['query'] = 'noOfAttempts=2';
                                break;
                            case 3:
                                this.attemptsChartData[2].value += 1;
                                this.attemptsChartData[2].records.push(kyc);
                                this.attemptsChartData[2]['query'] = 'noOfAttempts=3';
                                break;
                            case 4:
                                this.attemptsChartData[3].value += 1;
                                this.attemptsChartData[3].records.push(kyc);
                                this.attemptsChartData[3]['query'] = 'noOfAttempts=4';
                                break;
                            case 5:
                                this.attemptsChartData[4].value += 1;
                                this.attemptsChartData[4].records.push(kyc);
                                this.attemptsChartData[4]['query'] = 'noOfAttempts=5';
                                break;
                        }
                    }
                    if (attemptsData && Object.keys(attemptsData).length) {
                        for (const attemptsKey of Object.keys(attemptsData)) {
                            this.attemptsChartData.push(attemptsData[attemptsKey]);
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
        this.showDrillDown = false;
        this.drillDownData = data.records;
        console.log(this.drillDownData);
        this.drillDownTitle = data.title;
        this.drillDownQueryParams = data.query;
        this.showDrillDown = true;
    }

    hideDrillDownDetails() {
        this.showDrillDown = false;
    }

    applyFilters(params) {
        const url = environment.kycUrl + params;
        this.apiService.getData(url).subscribe(response => {
            console.log(response);
            if (this.showDrillDown) {
                this.drillDownData = response;
            } else {
                this.kycDetails = response;
            }
        })
    }

    getKycHistory() {
        this.apiService.getKycHistory().subscribe(response => {
            console.log(response);
            let tempKycHhistory: any;
            tempKycHhistory = response;
            for (const kycHistory of tempKycHhistory) {
                if (this.kycHistory[kycHistory.account_no]) {
                    this.kycHistory[kycHistory.account_no].push(kycHistory);
                } else {
                    this.kycHistory[kycHistory.account_no] = [];
                    this.kycHistory[kycHistory.account_no].push(kycHistory);
                }
            }
            console.log(this.kycHistory);
        })
    }

    openDocumentViewer(doc) {
        console.log(doc)
        const dialogRef = this.dialog.open(KycDocumentViewerComponent, {
            data: doc,
            width: '70%',
            height: '80%'
        })
    }

    openRemediations() {
        const dialogRef = this.dialog.open(RemediationsComponent, {
            width: '70%',
            height: '80%'
        })
    }

}
