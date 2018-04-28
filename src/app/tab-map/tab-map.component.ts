import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

// Services
import { ParisCultureAnalyse } from '../services/paris-culture.service';

@Component({
    selector: 'app-tab-map',
    templateUrl: './tab-map.component.html',
    styleUrls: ['./tab-map.component.scss']
})
export class TabMapComponent implements OnInit {

    @Input('initialData') initialData: ParisCultureAnalyse;
    @ViewChild('googleMapView') gmapElement: any;

    map: google.maps.Map;

    constructor() { }

    ngOnInit() {
        // Show  the google map on the center of Paris
        const mapProp = {
            center: new google.maps.LatLng(48.866667, 2.333333),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }

}
