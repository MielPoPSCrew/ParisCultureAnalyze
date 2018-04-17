import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import {
    MatToolbarModule
} from '@angular/material';

const MATERIAL_MODULES = [
    MatToolbarModule
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        MATERIAL_MODULES
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
