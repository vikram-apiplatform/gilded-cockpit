import {Component, Inject, OnInit} from '@angular/core';
import {APIService} from '../api.service';
import {environment} from '../../environments/environment';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LeftpanelComponent} from '../leftpanel/leftpanel.component';
import {RemediationsComponent} from '../remediations/remediations.component';

@Component({
    selector: 'app-kyc',
    templateUrl: './kyc.component.html',
    styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {

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
    statusChartHeader = 'KYC Status';
    attemptsChartHeader = 'No. Of Attempts';
    attemptsColorScheme = {
        domain: ['#ff6b6b', '#ff5252', '#ff3838', '#ff1f1f', '#ff0505']
    };
    isDataloading = true;
    showDrillDown = false;
    drillDownData: any;
    drillDownTitle = '';
    drillDownQueryParams = '';
    columns = ['account_no', 'full_name', 'email_id', 'mobile_no', 'country', 'is_kyc_verified', 'kyc_check_count'];
    kycHistoryColumns = ['date_created', 'last_updated', 'request_id', 'name', 'doc_type', 'reason', 'docInfo']

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
                    switch (kyc.is_kyc_verified) {
                        case true:
                            this.statusChartData[0].value += 1;
                            this.statusChartData[0].records.push(kyc);
                            this.statusChartData[0]['query'] = 'is_kyc_verified=true';
                            break;
                        case false:
                            this.statusChartData[1].value += 1;
                            this.statusChartData[1].records.push(kyc);
                            this.statusChartData[1]['query'] = 'is_kyc_verified=false';
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

                    this.attemptsChartData.sort((a, b) => {
                        if (a.name > b.name) {
                            return 1;
                        }
                        return -1;
                    });
                }
                this.isDataloading = false;
                console.log(this.statusChartData);
                console.log(this.attemptsChartData);
            }
        })
    }

    sortArray(a, b, key) {
        if (a[key] < b[key]) {
            return 1;
        }
        return -1;
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

    openRemediations(record) {
        const dialogRef = this.dialog.open(RemediationsComponent, {
            data: record,
            width: '70%',
            height: '80%'
        })
    }

}


@Component({
    selector: 'app-kyc-document-viewer',
    templateUrl: './kycDocumentViewer.html',
    styleUrls: ['./kyc.component.css']
})
export class KycDocumentViewerComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<KycDocumentViewerComponent>) {
        dialogRef.disableClose = true;
        console.log(this.data);
    }

    close() {
        this.dialogRef.close();
    }
}
