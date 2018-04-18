import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { TabArrayComponent } from './tab-array/tab-array.component';
import { TabAnalyzeComponent } from './tab-analyze/tab-analyze.component';
import { TabMapComponent } from './tab-map/tab-map.component';
import { TabCompareComponent } from './tab-compare/tab-compare.component';

// Modules
import { ChartsModule } from 'ng2-charts';

// Angular Material
import {
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule
} from '@angular/material';

const MATERIAL_MODULES = [
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        MainContainerComponent,
        TabArrayComponent,
        TabAnalyzeComponent,
        TabMapComponent,
        TabCompareComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ChartsModule,
        MATERIAL_MODULES
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
