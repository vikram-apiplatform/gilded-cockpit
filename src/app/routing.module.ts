import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {BoardComponent} from './board/board.component';
import {DetailComponent} from './detail/detail.component';
import {AdminMenuComponent} from './admin-menu/admin-menu.component';
import {KycComponent} from './kyc/kyc.component';
import {GildedCockpitComponent} from './gilded-cockpit/gilded-cockpit.component';
import {DynamicFormBuilderComponent} from './dynamic-form-builder/dynamic-form-builder.component';
import {OrderFormComponent} from './order-form/order-form.component';
import {PlaceOrderComponent} from './order-cmp/place-order/place-order.component';
import {OrderManagementComponent} from './order-cmp/order-management/order-management.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'cockpit',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'cockpit',
        component: BoardComponent
    },
    {
        path: 'detail',
        component: DetailComponent,
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'form',
        component: OrderFormComponent
    },
    {
        path: 'order',
        component: PlaceOrderComponent
    },
    {
        path: 'orders',
        component: OrderManagementComponent
    },
    {
        path: 'kyc',
        component: KycComponent,
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'admin',
        component: AdminMenuComponent,
        runGuardsAndResolvers: 'always'
    },


];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class RoutingModule {
}

