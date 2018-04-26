import { Component, OnInit } from '@angular/core';

// Services
import { ParisCultureService, ParisCultureAnalyse } from '../services/paris-culture.service';

@Component({
    selector: 'app-main-container',
    templateUrl: './main-container.component.html',
    styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

    public initialData: ParisCultureAnalyse;

    constructor(private parisCultureServcice: ParisCultureService) { }

    ngOnInit() {
        this.parisCultureServcice.getParisCultureAnalyse().subscribe(data => {
            this.initialData = data;
        });
     }

}
