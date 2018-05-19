import {Component, OnInit, Input, ViewChild, NgZone} from '@angular/core';
import {Event} from '../services/event.service';
import {} from '@types/googlemaps';
import { environment } from '../../environments/environment';
import _cloneDeep from 'lodash-es/cloneDeep';
import _forEach from 'lodash-es/forEach';
import _filter from 'lodash-es/filter';
import _indexOf from 'lodash-es/indexOf';
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
    // tslint:disable-next-line:no-input-rename
    @Input('initialData') initialData: ParisCultureAnalyse;
    @ViewChild('googleMapView') gmapElement: any;
    @ViewChild('eventsDetails') eventsDetailsElement: any;

    map: google.maps.Map;
    images: Object;
    events: Event[];
    markerClusterer: any;

    env        = environment;
    eventsType = ['Events', 'Museums', 'Cinemas'];
    quarters   = environment.cpList;

    private dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    private mapProp = {
        center: new google.maps.LatLng(48.866667, 2.333333),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    constructor(private _ngZone: NgZone) {
        const scaledSize = new google.maps.Size(20, 20);

        this.images = {
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

    /**
     * Angular init event
     */
    ngOnInit() {
        this.map             = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
        this.markerClusterer = new MarkerClusterer(
            this.map,
            [],
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
        );

        this.addMarkers();
    }

    /**
     * Display the date in the local time string
     *
     * @param {Date} date - The date to display
     *
     * @returns {string} The date in local string
     */
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

    /**
     * Refresh all the markers in the map
     */
    refreshMarkers() {
        this.markerClusterer.clearMarkers();
        this.addMarkers();
    }

    /**
     * Create a Google Map Marker based on the given parameters
     *
     * @param coordinate {Coordinate} - The GPS coordinate of the marker
     * @param title {string} - The marker title
     * @param icon {Icon} - The marker icon
     * @param info {string} - The marker information text
     *
     * @returns {google.maps.Marker} The Google Map Marker
     */
    addMarker(coordinate, title, icon, info) {
        const marker = new google.maps.Marker({
                position: {lat: coordinate.latitude, lng: coordinate.longitude},
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

    /**
     * Add markers to the map
     */
    addMarkers() {
        const markers = [];

        let data = _cloneDeep(this.initialData.arrondissements);

        // Filter quarters
        data = _filter(data, (quarter) => _indexOf(this.quarters, quarter.postcode) !== -1);

        // Filter events type and clean data coordinate null
        this.filterEventsType(data);

        _forEach(data, (item) => {
            // Museums
            _forEach(item.museums.items, (museum) => {
                let info = `${museum.name}<br><br>${museum.address}`;

                if (museum.website) {
                    info += `<br><br><a href="${museum.website}" target="_blank">website</a>`;
                }

                markers.push(this.addMarker(museum.coordinate, museum.name, this.images['museum'], info));
            });
            // Events
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
            // Cinemas
            _forEach(item.cinemas.items, (cinema) => {
                let info = `${cinema.name} (${cinema.places} places)<br><br>${cinema.address}`;

                if (cinema.website) {
                    info += `<br><br><a href="${cinema.website}" target="_blank">website</a>`;
                }

                markers.push(this.addMarker(cinema.coordinate, cinema.name, this.images['cinema'], info));
            });
        });

        this.markerClusterer.addMarkers(markers);

        google.maps.event.addListener(
            this.markerClusterer,
            'clusterclick',
            (cluster) => this.clusterClickEvent(cluster, data)
        );
    }

    /**
     * Filter events type and clean null GPS coordinates
     *
     * @param {Arrondissement[]} data - The data to filter
     */
    filterEventsType(data) {
        data.forEach(
            arrondissment => {
                if (_indexOf(this.eventsType, 'Cinemas') === -1) {
                    arrondissment.cinemas.items = [];
                } else {
                    arrondissment.cinemas.items = arrondissment.cinemas.items.filter(cinema => {
                        return cinema.coordinate.longitude && cinema.coordinate.latitude;
                    });
                }

                if (_indexOf(this.eventsType, 'Events') === -1) {
                    arrondissment.events.items = [];
                } else {
                    arrondissment.events.items = arrondissment.events.items.filter(event => {
                        return event.coordinate.longitude && event.coordinate.latitude;
                    });
                }

                if (_indexOf(this.eventsType, 'Museums') === -1) {
                    arrondissment.museums.items = [];
                } else {
                    arrondissment.museums.items = arrondissment.museums.items.filter(museum => {
                        return museum.coordinate.longitude && museum.coordinate.latitude;
                    });
                }
            }
        );
    }

    /**
     * Event to bind on a markerCluster click event
     *
     * @param cluster {MarkerClusterer} - The cluster where the markers are binded
     * @param data {Arrondissement[]} - Global data information about quarters, events, cinemas, museums...
     */
    clusterClickEvent(cluster, data) {
        this._ngZone.run(() => {
            if (cluster.markerClusterer_.prevZoom_ >= 14) {
                const delta  = 0.00001;

                let events = [];

                data.forEach(
                    arrondissment => {
                        const filteredEvents = (arrondissment.events.items.filter(event => {
                            // tslint:disable-next-line
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
    }
}
