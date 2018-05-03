import {Component, OnInit, Input, ViewChild, NgZone} from '@angular/core';
import {Event} from '../services/event.service';
import {} from '@types/googlemaps';
import _forEach from 'lodash-es/forEach';
import _concat from 'lodash-es/concat';
import _inRange from 'lodash-es/inRange';

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
    @ViewChild('eventsDetails') eventsDetailsElement: any;

    map: google.maps.Map;
    images: Object;
    events: Event[];
    private dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    constructor(private _ngZone: NgZone) {
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

        const markerClusterer = new MarkerClusterer(
            this.map,
            markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
        );

        google.maps.event.addListener(markerClusterer, 'clusterclick', (cluster) => {
            this._ngZone.run(() => {
                if (cluster.markerClusterer_.prevZoom_ === 22) {
                    const delta  = 0.00001;

                    let events = [];

                    data.forEach(
                        arrondissment => {
                            const filteredEvents = (arrondissment.events.items.filter(event => {
                                return _inRange(cluster.center_.lng(), event.coordinate.longitude - delta, event.coordinate.longitude + delta) &&
                                    _inRange(cluster.center_.lat(), event.coordinate.latitude - delta, event.coordinate.latitude + delta);
                            }));

                            if (filteredEvents.length > 0) {
                                events = _concat(events, filteredEvents);
                            }
                        }
                    );

                    this.events = events;

                    this.gmapElement.nativeElement.style.width          = '70%';
                    this.eventsDetailsElement.nativeElement.style.width = '30%';
                }
            });
        });
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

    renderDate(date: Date) {
        return date.toLocaleDateString('fr-FR', this.dateOptions);
    }

    /**
     * Close the events details view and put he Google Map in full screen
     */
    closeEventsDetails() {
        this.gmapElement.nativeElement.style.width          = '100%';
        this.eventsDetailsElement.nativeElement.style.width = '0';
    }
}
