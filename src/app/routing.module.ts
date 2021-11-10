import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {BoardComponent} from './board/board.component';
import {DetailComponent} from './detail/detail.component';
import {AdminMenuComponent} from './admin-menu/admin-menu.component';
import {KycComponent} from './kyc/kyc.component';
import {GildedCockpitComponent} from './gilded-cockpit/gilded-cockpit.component';

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
    imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class RoutingModule {
}

