import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { TabArrayComponent } from './tab-array/tab-array.component';
import { TabAnalyzeComponent } from './tab-analyze/tab-analyze.component';
import { TabMapComponent } from './tab-map/tab-map.component';
import { TabCompareComponent } from './tab-compare/tab-compare.component';
import { AboutComponent } from './about/about.component';

// Providers
import { CinemaService } from './services/cinema.service';
import { EventService } from './services/event.service';
import { MuseumService } from './services/museum.service';
import { ParisCultureService } from './services/paris-culture.service';

// Modules
import { ChartsModule } from 'ng2-charts';

// Angular Material
import {
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDividerModule
} from '@angular/material';

const MATERIAL_MODULES = [
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDividerModule
];

const appRoutes: Routes = [
    { path: '', component: MainContainerComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', component: MainContainerComponent }
];


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        MainContainerComponent,
        TabArrayComponent,
        TabAnalyzeComponent,
        TabMapComponent,
        TabCompareComponent,
        AboutComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        ChartsModule,
        FormsModule,
        ...MATERIAL_MODULES
    ],
    providers: [
      CinemaService,
      EventService,
      MuseumService,
      ParisCultureService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
