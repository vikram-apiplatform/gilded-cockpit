import {Component, OnInit} from '@angular/core';

export interface Menu {
    name: string;
    iconClass: string;
    active: boolean;
    toolTip: string;
    submenu: { name: string, key: string, icon: string, toolTip: string }[];
}

export interface Config {
    // selector?: String,
    multi?: boolean;
}

@Component({
    selector: 'app-admin-menu',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

    options: Config = {multi: false};
    showFiller = false;
    // adminMenu: Menu[] = [
    //     {
    //         name: 'Users',
    //         iconClass: 'fa fa-users',
    //         active: false,
    //         toolTip: 'Platform Experience',
    //         submenu: [
    //             {name: 'Platform Console', key: 'Platform Console', icon: 'fa fa-desktop', toolTip: 'Platform Console'},
    //             {name: 'Developer Experience', key: 'Developer Experience', icon: 'fa fa-rocket', toolTip: 'Developer Experience'},
    //             {name: 'API Gateway', key: 'API Gateway Manager', icon: 'fa fa-shield', toolTip: 'API Gateway'},
    //             {name: 'File Storage', key: 'Storage', icon: 'fa fa-folder', toolTip: 'File Storage'},
    //             {name: 'Databases', key: 'Databases', icon: 'fa fa-database', toolTip: 'Databases'}
    //         ]
    //     },
    //     {
    //         name: 'Roles',
    //         iconClass: 'fa fa-user-secret',
    //         active: false,
    //         toolTip: 'Platform Experience',
    //         submenu: []
    //     },
    //     {
    //         name: 'Downloads',
    //         iconClass: 'fa fa-cloud-download',
    //         active: false,
    //         toolTip: 'Platform Experience',
    //         submenu: []
    //     },
    //     {
    //         name: 'KYC',
    //         iconClass: 'fa fa-briefcase',
    //         active: false,
    //         toolTip: 'Platform Experience',
    //         submenu: []
    //     },
    //     {
    //         name: 'Fee Structures',
    //         iconClass: 'fa fa-usd',
    //         active: false,
    //         toolTip: 'Platform Experience',
    //         submenu: []
    //     },
    //     {
    //         name: 'Transactions',
    //         iconClass: 'fa fa-money',
    //         active: false,
    //         toolTip: 'Platform Experience',
    //         submenu: []
    //     },
    //     {
    //         name: 'Inventory',
    //         iconClass: 'fa fa-building',
    //         active: false,
    //         toolTip: 'Platform Experience',
    //         submenu: []
    //     },
    //     {
    //         name: 'Third Party Data',
    //         iconClass: 'fa fa-database',
    //         active: false,
    //         toolTip: 'Platform Experience',
    //         submenu: []
    //     },
    //     {
    //         name: 'Referrals',
    //         iconClass: 'fa fa-refresh',
    //         active: false,
    //         toolTip: 'Platform Experience',
    //         submenu: []
    //     },
    //     {
    //         name: 'Reports',
    //         iconClass: 'fa fa-bar-chart',
    //         active: false,
    //         toolTip: 'Platform Experience',
    //         submenu: []
    //     },
    //     {
    //         name: 'Integrations',
    //         iconClass: 'fa fa-cog',
    //         active: false,
    //         toolTip: 'Platform Experience',
    //         submenu: []
    //     },
    // ]


    adminMenu: Menu[] = [
        {
            name: 'Dashboard',
            iconClass: 'fa fa-users',
            active: false,
            toolTip: 'Platform Experience',
            submenu: [
                {name: 'Platform Console', key: 'Platform Console', icon: 'fa fa-desktop', toolTip: 'Platform Console'},
                {name: 'Developer Experience', key: 'Developer Experience', icon: 'fa fa-rocket', toolTip: 'Developer Experience'},
                {name: 'API Gateway', key: 'API Gateway Manager', icon: 'fa fa-shield', toolTip: 'API Gateway'},
                {name: 'File Storage', key: 'Storage', icon: 'fa fa-folder', toolTip: 'File Storage'},
                {name: 'Databases', key: 'Databases', icon: 'fa fa-database', toolTip: 'Databases'}
            ]
        },
        {
            name: 'Downloads',
            iconClass: 'fa fa-cloud-download',
            active: false,
            toolTip: 'Platform Experience',
            submenu: []
        },
        {
            name: 'KYC',
            iconClass: 'fa fa-users',
            active: false,
            toolTip: 'Platform Experience',
            submenu: []
        },
        {
            name: 'Anti-Money Laundering',
            iconClass: 'fa fa-user-secret',
            active: false,
            toolTip: 'Platform Experience',
            submenu: []
        },
        {
            name: 'Transactions',
            iconClass: 'fa fa-usd',
            active: false,
            toolTip: 'Platform Experience',
            submenu: []
        },
        {
            name: 'Inventory',
            iconClass: 'fa fa-briefcase',
            active: false,
            toolTip: 'Platform Experience',
            submenu: []
        },
        {
            name: 'PayTM',
            iconClass: 'fa fa-money',
            active: false,
            toolTip: 'Platform Experience',
            submenu: []
        },
    ]

    constructor() {
    }

    ngOnInit() {
    }

}
