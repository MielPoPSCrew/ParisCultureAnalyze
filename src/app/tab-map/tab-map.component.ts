import {Component, OnInit, Input} from '@angular/core';
import {ViewChild} from '@angular/core';
import {} from '@types/googlemaps';
import _forEach from 'lodash-es/forEach';

// mock
import {mockCleanData} from '../../mocks/mockCleanData';

// Services
import {ParisCultureAnalyse} from '../services/paris-culture.service';

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
        const scaledSize = new google.maps.Size(20, 20),
              markers    = [],
              mapProp    = {
                center: new google.maps.LatLng(48.866667, 2.333333),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
               },
              images     = {
                museum: {
                    url       : 'assets/images/museum.svg',
                    size      : new google.maps.Size(50, 50),
                    scaledSize: scaledSize,
                    origin    : new google.maps.Point(0, 0),
                    anchor    : new google.maps.Point(25, 50)
                },
                cinema: {
                    url       : 'assets/images/movie-theater.svg',
                    size      : new google.maps.Size(50, 50),
                    scaledSize: scaledSize,
                    origin    : new google.maps.Point(0, 0),
                    anchor    : new google.maps.Point(25, 50)
                },
                event: {
                    url       : 'assets/images/embassy.svg',
                    size      : new google.maps.Size(50, 50),
                    scaledSize: scaledSize,
                    origin    : new google.maps.Point(0, 0),
                    anchor    : new google.maps.Point(0, 50)
                }
              };

        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

        _forEach(mockCleanData.data, (event) => {
            const marker = new google.maps.Marker({
                    position: {lat: event.coords.y, lng: event.coords.x},
                    title: event.title,
                    icon: images[event.type],
                    map: this.map
                }),
                infowindow = new google.maps.InfoWindow({
                    content: event.info
                });

            marker.addListener('click', () => infowindow.open(this.map, marker));

            markers.push(marker);
        });

        const markerCluster = new MarkerClusterer(
            this.map,
            markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
        );
    }
}
