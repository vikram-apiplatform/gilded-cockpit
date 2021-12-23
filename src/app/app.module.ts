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
import {MatButtonModule, MatCardModule, MatIconModule, MatProgressBarModule, MatToolbarModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {LeftpanelComponent} from './leftpanel/leftpanel.component';
import {AdminMenuComponent} from './admin-menu/admin-menu.component';
import {DashbordOverviewComponent} from './dashbord-overview/dashbord-overview.component';
import {AttributeDescriptionComponent, DynamicFormBuilderComponent} from './dynamic-form-builder/dynamic-form-builder.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {OrderFormComponent} from './order-form/order-form.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DynamicFormGeneratorComponent} from './dynamic-form-builder/dynamic-form-generator/dynamic-form-generator.component';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {OrderCmpComponent} from './order-cmp/order-cmp.component';
import {PlaceOrderComponent} from './order-cmp/place-order/place-order.component';
import {OrderManagementComponent} from './order-cmp/order-management/order-management.component';
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
import {ChartDrilldownComponent} from './chart-drilldown/chart-drilldown.component';
import {FilterPipe} from './filter.pipe';
import {MatExpansionModule} from '@angular/material/expansion';
import {KycDocumentViewerComponent} from './kyc/kyc.component';
import { AmlComponent } from './aml/aml.component';
import { RemediationsComponent } from './remediations/remediations.component';
import {ImageViewerComponent} from './image-viewer/image-viewer.component';
import {AutomationReportComponent} from './automation-report/automation-report.component';
import {BuildReportComponent} from './automation-report/build-report/build-report.component';
import {MatListModule} from '@angular/material/list';
import {ChartsModule} from 'ng2-charts';
import { AutomationDashboardComponent } from './automation-dashboard/automation-dashboard.component';
import {GaugeChartModule} from 'angular-gauge-chart';

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
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        DragDropModule,
        MatSelectModule,
        MatIconModule,
        MatTooltipModule,
        MatIconModule,
        GridModule,
        NgxChartsModule,
        GadgetSharedModule,
        DndModule,
        DynamicFormModule,
        ErrorHandlerModule,
        GadgetModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatToolbarModule,
        MatListModule,
        ChartsModule,
        GaugeChartModule
    ],
    declarations: [
        AppComponent,
        LeftpanelComponent,
        AdminMenuComponent,
        DashbordOverviewComponent,
        DynamicFormBuilderComponent,
        AttributeDescriptionComponent,
        OrderFormComponent,
        DynamicFormGeneratorComponent,
        OrderCmpComponent,
        PlaceOrderComponent,
        OrderManagementComponent,
        GildedCockpitComponent,
        CockpitHeaderComponent,
        KycComponent,
        DonutComponent,
        ChartDrilldownComponent,
        FilterPipe,
        KycDocumentViewerComponent,
        AmlComponent,
        RemediationsComponent,
        ImageViewerComponent,
        AutomationReportComponent,
        BuildReportComponent,
        AutomationDashboardComponent,
    ],
    providers: [APIService, LeftpanelComponent, KycDocumentViewerComponent],
    entryComponents: [AttributeDescriptionComponent, KycDocumentViewerComponent, RemediationsComponent, ImageViewerComponent],
    exports: [
        ChartDrilldownComponent
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
