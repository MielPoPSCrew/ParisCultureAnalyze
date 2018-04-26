import { Component, OnInit, Input } from '@angular/core';

// Services
import { ParisCultureAnalyse } from '../services/paris-culture.service';

@Component({
    selector: 'app-tab-map',
    templateUrl: './tab-map.component.html',
    styleUrls: ['./tab-map.component.scss']
})
export class TabMapComponent implements OnInit {

    @Input('initialData') initialData: ParisCultureAnalyse;

    constructor() { }

    ngOnInit() { }

}
