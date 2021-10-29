import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {BoardComponent} from './board/board.component';
import {DetailComponent} from './detail/detail.component';

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


];

@NgModule({
    imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class RoutingModule {
}

