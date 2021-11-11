import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {RoutingModule} from './routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {DetailModule} from './detail/detail.module';
import {MenuModule} from './menu/menu.module';
import {BoardModule} from './board/board.module';
import {MatButtonModule, MatCardModule, MatIconModule, MatProgressBarModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {LeftpanelComponent} from './leftpanel/leftpanel.component';
import {AdminMenuComponent} from './admin-menu/admin-menu.component';
import {DashbordOverviewComponent} from './dashbord-overview/dashbord-overview.component';
import {GildedCockpitComponent} from './gilded-cockpit/gilded-cockpit.component';
import {GridModule} from './grid/grid.module';
import {CockpitHeaderComponent} from './cockpit-header/cockpit-header.component';
import {KycComponent} from './kyc/kyc.component';
import {DonutComponent} from './gadgets/gold-inventory/donut/donut.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {GadgetSharedModule} from './gadgets/_common/gadget-shared.module';
import {DndModule} from 'ng2-dnd';
import {DynamicFormModule} from './dynamic-form/dynamic-form-module';
import {ErrorHandlerModule} from './error/error.module';
import {GadgetModule} from './gadgets/gadget.module';
import {APIService} from './api.service';
import { ChartDrilldownComponent } from './chart-drilldown/chart-drilldown.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RoutingModule,
        FormsModule,
        HttpClientModule,
        BoardModule,
        MenuModule,
        DetailModule,
        HttpClientJsonpModule,
        MatCardModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        GridModule,
        NgxChartsModule,
        GadgetSharedModule,
        DndModule,
        DynamicFormModule,
        ErrorHandlerModule,
        GadgetModule,
        MatProgressBarModule
    ],
    providers: [
        APIService
    ],
    declarations: [
        AppComponent,
        LeftpanelComponent,
        AdminMenuComponent,
        DashbordOverviewComponent,
        GildedCockpitComponent,
        CockpitHeaderComponent,
        KycComponent,
        DonutComponent,
        ChartDrilldownComponent,
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
