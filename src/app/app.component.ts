import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gilded Cockpit';
  subMenuPanelExpanded = false;
  leftMenuPanelExpanded = 'col-md-1 col-lg-1 sideBarExpanded';
  homeCheck = false;
  SideMenuNavigationUrl: string;
  SidePanelCheck: boolean;

  constructor() {
    this.getLeftPanel();
  }
  getLeftPanel() {
    this.SidePanelCheck = true;
    this.SideMenuNavigationUrl = '/cockpit';
    this.homeCheck = true;
  }
}
