import {Component, OnInit, Input} from '@angular/core';
import {ViewChild} from '@angular/core';
import {} from '@types/googlemaps';
import _forEach from 'lodash-es/forEach';

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
    images: Object;

    constructor() {
        const scaledSize = new google.maps.Size(20, 20);

        this.images     = {
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
    }

    ngOnInit() {
        const markers    = [],
              data       = this.initialData.arrondissements,
              mapProp    = {
                center: new google.maps.LatLng(48.866667, 2.333333),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };

        // Clean data coordinate null
        data.forEach(
            arrondissment => {
                arrondissment.cinemas.items = arrondissment.cinemas.items.filter(cinema => {
                    return cinema.coordinate.longitude && cinema.coordinate.latitude;
                });
                arrondissment.events.items = arrondissment.events.items.filter(event => {
                    return event.coordinate.longitude && event.coordinate.latitude;
                });
                arrondissment.museums.items = arrondissment.museums.items.filter(museum => {
                    return museum.coordinate.longitude && museum.coordinate.latitude;
                });
            }
        );

        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

        _forEach(data, (item) => {
            _forEach(item.museums.items, (museum) => {
                let info = `${museum.name}<br><br>${museum.address}`;

                if (museum.website) {
                    info += `<br><br><a href="${museum.website}" target="_blank">website</a>`;
                }

                markers.push(this.addMarker(museum.coordinate, museum.name, this.images['museum'], info));
            });

            _forEach(item.events.items, (event) => {
                let info = `${event.name}`;

                if (event.name !== event.description) {
                    info += `<br><br>${event.description}`;
                }

                if (event.website) {
                    info += `<br><br><a href="${event.website}" target="_blank">website</a>`;
                }

                markers.push(this.addMarker(event.coordinate, event.name, this.images['event'], info));
            });

            _forEach(item.cinemas.items, (cinema) => {
                let info = `${cinema.name} (${cinema.places} places)<br><br>${cinema.address}`;

                if (cinema.website) {
                    info += `<br><br><a href="${cinema.website}" target="_blank">website</a>`;
                }

                markers.push(this.addMarker(cinema.coordinate, cinema.name, this.images['cinema'], info));
            });
        });

        const markerCluster = new MarkerClusterer(
            this.map,
            markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
        );
    }

    addMarker(coord, title, icon, info) {
        const marker = new google.maps.Marker({
                position: {lat: coord.latitude, lng: coord.longitude},
                title: title,
                icon: icon,
                map: this.map
            }),
            infowindow = new google.maps.InfoWindow({
                content: info
            });

        marker.addListener('click', () => infowindow.open(this.map, marker));

        return marker;
    }
}
