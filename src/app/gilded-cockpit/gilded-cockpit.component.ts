import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from '../services/configuration.service';
import {MenuEventService} from '../menu/menu-service';

@Component({
    selector: 'app-gilded-cockpit',
    templateUrl: './gilded-cockpit.component.html',
    styleUrls: ['./gilded-cockpit.component.css']
})
export class GildedCockpitComponent implements OnInit {


    dashboardList = [];
    selectedBoard = '';

    constructor(public _configurationService: ConfigurationService, public _menuEventService: MenuEventService) {
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
                // if (data && data.length) {
                //   this.adminMenu[0].submenu = [];
                // }
                data.forEach(board => {

                  me.dashboardList.push(board.title);
                  // this.adminMenu[0].submenu.push({
                  //   name: board.title,
                  //   key: board.title,
                  //   icon: 'fa fa-th',
                  //   toolTip: 'Platform Console'
                  // });

                });
                //
                // console.log(this.dashboardList);

                if (selectedBoard === '') {
                    this.selectedBoard = this.dashboardList[0];
                    //this.defaultActiveMenu = this.adminMenu[0].submenu[0].key;
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

}
