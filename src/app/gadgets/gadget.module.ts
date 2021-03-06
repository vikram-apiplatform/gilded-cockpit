import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CPUGadgetComponent} from './cpu/cpu-gadget.component';
import {CPUMGadgetComponent} from './cpum/cpum-gadget.component';
import {DiskGadgetComponent} from './disk/disk-gadget.component';
import {MemoryGadgetComponent} from './memory/memory-gadget.component';
import {EdgeServiceListGadgetComponent} from './edge-service-list/edge-service-list-gadget.component';
import {StatisticGadgetComponent} from './statistic/statistic-gadget.component';
import {TrendGadgetComponent} from './trend/trend-gadget.component';
import {TrendLineGadgetComponent} from './trend-line/trend-line-gadget.component';
import {NewsGadgetComponent} from './news/news-gadget.component';
import {TodoGadgetComponent} from './todo/todo-gadget.component';  // todo gadget
import {JobAnalysisGadgetComponent} from './job-analysis/job-analysis-gadget.component';
import {CPUService} from './cpu/service';
import {GoldService} from './gold-inventory/service';
import {EdgeService} from './edge-service-list/service';
import {StatisticService} from './statistic/service';
import {DiskService} from './disk/service';
import {TrendService} from './trend/service';
import {PropertyListGadgetComponent} from './property-list/property-list-gadget.component';
import {DynamicFormModule} from '../dynamic-form/dynamic-form-module';
import {ServiceListGadgetComponent} from './service-list/service-list-gadget.component';
import {DndModule} from 'ng2-dnd';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {GadgetSharedModule} from './_common/gadget-shared.module';
import {ErrorHandlerModule} from '../error/error.module';

import {PortConnectionGadgetComponent} from './port-connection/port-connection-gadget.component';
import {
    MatButtonModule, MatCheckboxModule, MatExpansionModule, MatIconModule, MatInputModule, MatOptionModule,
    MatProgressBarModule, MatSelectModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {StorageObjectListComponent} from './storage-object-list/storage-object-list.component';
import {StorageService} from './storage-object-list/service';
import {DataListModule} from '../datalist/data-list.module';
import {DonutGadgetComponent} from './donut/donut-gadget.component';
import {DonutService} from './donut/service';
import {APITokenService} from '../api-token/api-token.service';
import {DrillDownComponent} from './donut/drill-down-component';
import {FacetModule} from '../facet/facet.module';
import {TypeAheadInputModule} from '../typeahead-input/typeahead-input.module';
import {TodoService} from './todo/service';
import {ConnectionService} from './port-connection/service';
import {BubbleGadgetComponent} from './bubble/bubble-gadget.component';
import {ResultViewComponent} from './port-connection/result-view.component';
import {SolutionViewComponent} from './port-connection/solution-view.component';
import {BarChartGadgetComponent} from './barchart/barchart-gadget.component';
import {BarChartService} from './barchart/service';
import {PieChartGadgetComponent} from './piechart/piechart-gadget.component';
import {PieChartService} from './piechart/service';
import {GoldInventoryGadgetComponent} from './gold-inventory/gold-inventory-gadget.component';
import {AppModule} from '../app.module';
import {ChartDrillDownComponent, CustomDateParserFormatter} from './gold-inventory/chart-drill-down/chart-drill-down.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {MatMenuModule} from '@angular/material/menu';
import {DataTableModule} from 'angular2-datatable';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {BarchartComponent} from './gold-inventory/barchart/barchart.component';
import {NgbDateParserFormatter, NgbDatepickerModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';

// todo gadget


@NgModule({
    imports: [
        CommonModule,
        GadgetSharedModule,
        DndModule.forRoot(),
        DynamicFormModule,
        ErrorHandlerModule,
        NgxChartsModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatOptionModule,
        MatSelectModule,
        FormsModule,
        FacetModule,
        TypeAheadInputModule,
        DataListModule,
        NgMultiSelectDropDownModule,
        MatMenuModule,
        DataTableModule,
        MatTableModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgbPaginationModule,
        MatChipsModule,
        MatCardModule,
        NgbDatepickerModule
    ],
    declarations: [
        TodoGadgetComponent,  // todo gadget
        CPUGadgetComponent,
        GoldInventoryGadgetComponent,
        CPUMGadgetComponent,
        DiskGadgetComponent,
        MemoryGadgetComponent,
        EdgeServiceListGadgetComponent,
        StatisticGadgetComponent,
        TrendGadgetComponent,
        TrendLineGadgetComponent,
        NewsGadgetComponent,
        JobAnalysisGadgetComponent,
        StatisticGadgetComponent,
        PropertyListGadgetComponent,
        ServiceListGadgetComponent,
        PortConnectionGadgetComponent,
        StorageObjectListComponent,
        DonutGadgetComponent,
        DrillDownComponent,
        BubbleGadgetComponent,
        ResultViewComponent,
        SolutionViewComponent,
        BarChartGadgetComponent,
        PieChartGadgetComponent,
        ChartDrillDownComponent,
        BarchartComponent,

    ],

    providers: [TrendService,
        DiskService,
        StatisticService,
        EdgeService,
        CPUService,
        GoldService,
        StorageService,
        DonutService,
        APITokenService,
        ConnectionService,
        TodoService,  // todo gadget
        BarChartService,
        PieChartService,
        {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
    ],

    exports: [
        TodoGadgetComponent,  // todo gadget
        CPUGadgetComponent,
        GoldInventoryGadgetComponent,
        CPUMGadgetComponent,
        DiskGadgetComponent,
        MemoryGadgetComponent,
        EdgeServiceListGadgetComponent,
        StatisticGadgetComponent,
        TrendGadgetComponent,
        TrendLineGadgetComponent,
        NewsGadgetComponent,
        JobAnalysisGadgetComponent,
        StatisticGadgetComponent,
        PropertyListGadgetComponent,
        ServiceListGadgetComponent,
        PortConnectionGadgetComponent,
        StorageObjectListComponent,
        DonutGadgetComponent,
        BubbleGadgetComponent,
        BarChartGadgetComponent,
        PieChartGadgetComponent,
        DrillDownComponent,
        ChartDrillDownComponent,
        BarchartComponent
    ],
    bootstrap: [ChartDrillDownComponent]
})
export class GadgetModule {
}

