import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from '../services/configuration.service';
import {MenuEventService} from '../menu/menu-service';
import { Router } from '@angular/router';

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
    dashboardList = [];
    selectedBoard = '';
    defaultActiveMenu = '';
    showFiller = true;
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
            iconClass: 'fa fa-tachometer',
            active: true,
            toolTip: 'Platform Experience',
            submenu: []
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
            submenu: [{
                name: 'Place Order',
                key: 'Place Order',
                icon: 'fa fa-th',
                toolTip: 'Place Order'
            }]
        },
        {
            name: 'Configurations',
            iconClass: 'fa fa-briefcase',
            active: false,
            toolTip: 'Configurations',
            submenu: [{
                name: 'Order Form',
                key: 'Order Form',
                icon: 'fa fa-th',
                toolTip: 'Order Form'
            }]
        },
        {
            name: 'PayTM',
            iconClass: 'fa fa-money',
            active: false,
            toolTip: 'Platform Experience',
            submenu: []
        },
    ]

    constructor(public _configurationService: ConfigurationService, public _menuEventService: MenuEventService, private router: Router) {
    }

    ngOnInit() {
        this.updateDashboardMenu('');
    }

    updateDashboardMenu(selectedBoard: string) {

        this._configurationService.getBoards().subscribe(data => {

            const me = this;
            if (data && data instanceof Array && data.length) {
                this.dashboardList.length = 0;


                // sort boards
                data.sort((a: any, b: any) => a.boardInstanceId - b.boardInstanceId);
                if (data && data.length) {
                    this.adminMenu[0].submenu = [];
                }
                data.forEach(board => {

                    me.dashboardList.push(board.title);
                    this.adminMenu[0].submenu.push({
                        name: board.title,
                        key: board.title,
                        icon: 'fa fa-th',
                        toolTip: 'Platform Console'
                    });

                });

                console.log(this.dashboardList);

                if (selectedBoard === '') {
                    this.selectedBoard = this.dashboardList[0];
                    this.defaultActiveMenu = this.adminMenu[0].submenu[0].key;
                    //this.boardSelect(this.dashboardList[0]);

                } else {

                    //this.boardSelect(selectedBoard);
                }
            }
        });
    }

    setupEventListeners() {
        let gridEventSubscription = this._menuEventService.listenForGridEvents().subscribe((event: IEvent) => {

            const edata = event['data'];

            switch (event['name']) {
                case 'boardUpdateEvent':
                    this.updateDashboardMenu(edata);
                    break;
            }

        });

        this._menuEventService.addSubscriber(gridEventSubscription);

    }

    menuItemSelected(menuItem) {
        console.log(menuItem.parent)
        if (menuItem.parent === 'Dashboard') {
            this.selectedBoard = menuItem.child;
            this._menuEventService.raiseMenuEvent({name: 'boardSelectEvent', data: menuItem.child});
        } else if ((menuItem.parent === 'Inventory')) {
            this.router.navigateByUrl('/order')
        } else if ((menuItem.parent === 'Configurations')) {
            this.router.navigateByUrl('/form')
        }
    }

    dashboardSelected(menuItem) {
        this.selectedBoard = menuItem.child;
        this._menuEventService.raiseMenuEvent({name: 'boardSelectEvent', data: menuItem.child});
    }

    toggleFiller() {
        this.showFiller = !this.showFiller;
    }
}
