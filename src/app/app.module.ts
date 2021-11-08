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
import {MatCardModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import {AttributeDescriptionComponent, DynamicFormBuilderComponent} from './dynamic-form-builder/dynamic-form-builder.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { OrderFormComponent } from './order-form/order-form.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DynamicFormGeneratorComponent } from './dynamic-form-builder/dynamic-form-generator/dynamic-form-generator.component';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { OrderCmpComponent } from './order-cmp/order-cmp.component';
import { PlaceOrderComponent } from './order-cmp/place-order/place-order.component';

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
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        DragDropModule,
        MatSelectModule,
        MatIconModule,
        MatTooltipModule,
    ],
    declarations: [
        AppComponent,
        LeftpanelComponent,
        AdminMenuComponent,
        DynamicFormBuilderComponent,
        AttributeDescriptionComponent,
        OrderFormComponent,
        DynamicFormGeneratorComponent,
        OrderCmpComponent,
        PlaceOrderComponent
    ],
    providers: [LeftpanelComponent],
    entryComponents: [AttributeDescriptionComponent],

    bootstrap: [AppComponent]
})
export class AppModule {
}
