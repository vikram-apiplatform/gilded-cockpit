import {Component, OnInit} from '@angular/core';


export interface Alert {
    name: string;
    icon: string;
    notifications: number;
}

@Component({
    selector: 'app-cockpit-header',
    templateUrl: './cockpit-header.component.html',
    styleUrls: ['./cockpit-header.component.css']
})
export class CockpitHeaderComponent implements OnInit {


    alerts: Alert[] = [
        // {
        //     name: 'Downloads',
        //     icon: 'fa fa-cloud-download',
        //     notifications: 10
        // },
        {
            name: 'KYC Verifications',
            icon: 'fa fa-users',
            notifications: 12
        },
        {
            name: 'AML Verifications',
            icon: 'fa fa-user-secret',
            notifications: 10
        },
        {
            name: 'Inventory',
            icon: 'fa fa-briefcase',
            notifications: 10
        }
    ]

    constructor() {
    }

    ngOnInit() {
    }

}
