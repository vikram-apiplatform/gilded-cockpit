import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {APIService} from '../api.service';
import * as moment from 'moment';

@Component({
    selector: 'app-remediations',
    templateUrl: './remediations.component.html',
    styleUrls: ['./remediations.component.scss']
})
export class RemediationsComponent implements OnInit {


    message: any;
    accNo: any;
    name: any;
    remediationTableData: any;
    columns = [];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<RemediationsComponent>, public apiService: APIService) {
        dialogRef.disableClose = true;
        console.log(this.data);
    }


    ngOnInit() {
        this.accNo = this.data.account_no ? this.data.account_no : this.data['tracking_id'];
        this.name = this.data.full_name ? this.data.full_name : this.data['inquiry_name'];
        this.getRemediationsData()
    }

    getRemediationsData() {
        this.apiService.getRemediationsData('?account_no=' + this.accNo + '&type=kyc').subscribe(response => {
            this.remediationTableData = response;
            // this.remediationTableData.sort((a, b) => {
            //     return <any>new Date(b.time).getTime() - <any>new Date(a.time).getTime();
            // });
            if (this.remediationTableData && this.remediationTableData.length) {
                this.columns = Object.keys(this.remediationTableData[0]);
            }
        })
    }


    close() {
        this.dialogRef.close();
    }

    sendMessage() {
        const date = new Date();
        const payload = {
            account_no: this.accNo,
            time: Date.now(),
            note: this.message,
            type: 'kyc'
        }
        this.apiService.postRemediationsData(payload).subscribe(response => {
            this.getRemediationsData();
        })
    }

    getReadableFormat(key) {
        const formattedKey = key.replace(/([a-z])([A-Z])/g, '$1 $2');
        const words = formattedKey.split(' ');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        return words.join(' ');
    }

    getType(data) {
        return typeof data;
    }

    getActualData(key, data) {
        if (key === 'date') {
            return moment(data).format('LLL');
        } else if (key === 'time') {
            return moment(data).format('LLL');
        }
        return data;
    }

}
