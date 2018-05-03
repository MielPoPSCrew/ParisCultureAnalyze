import { Component, OnInit, Input } from '@angular/core';
import { ParisCultureAnalyse } from '../services/paris-culture.service';

@Component({
    selector: 'app-tab-export',
    templateUrl: './tab-export.component.html',
    styleUrls: ['./tab-export.component.scss']
})
export class TabExportComponent implements OnInit {

    @Input('initialData') initialData: ParisCultureAnalyse;

    constructor() {
        console.log('Tab export constructed', this.initialData);
    }

    ngOnInit() { 
        console.log('Tab export init', this.initialData);

    }

}
