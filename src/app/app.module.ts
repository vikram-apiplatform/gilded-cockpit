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
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { DashbordOverviewComponent } from './dashbord-overview/dashbord-overview.component';

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
        MatIconModule
    ],
    declarations: [
        AppComponent,
        LeftpanelComponent,
        AdminMenuComponent,
        DashbordOverviewComponent,
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
