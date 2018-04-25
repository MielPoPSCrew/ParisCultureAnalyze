import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { flatMap, tap, map, toArray, shareReplay, filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { Coordinate } from '../../shared/Coordinate';

export interface Event {
  title: string;
  description: string;
  details: string;
  website: string;
  place: string;
  address: string;
  coordinate: Coordinate;
  periode: {
    start: Date;
    end: Date;
  };
  keywords: string[];
  arrondissment: string;
}

@Injectable()
export class EventService {

  private events$: Observable<Event[]>;

  constructor(private http: HttpClient) {
    this.events$ = this.buildEventsObservable();
  }

  public getEvents(): Observable<Event[]> {
    return this.events$;
  }

  private buildEventsObservable(): Observable<Event[]> {
    return this.http.get<any>('./data/events.json')
    .pipe(
      flatMap(jsonArray => jsonArray),
      map(json => this.rawToEvent(json)),
      filter(event => event.periode.start > new Date('2018')),
      filter(event => event.arrondissment !== undefined),
      toArray(),
      shareReplay(1),
    );
  }

  private rawToEvent(json: any): Event {
    const fields = json['fields'];

    const event = <Event>{};
    event.title = fields['title'];
    event.description = fields['description'];
    event.details = fields['free_text'];
    event.website = fields['link'];
    event.place = fields['placename'];
    event.address = fields['address'];
    event.coordinate = {
      latitude: fields['latlon'] ? fields['latlon'][0] : null,
      longitude: fields['latlon'] ? fields['latlon'][1] : null
    };
    event.periode = {
      start: new Date(fields['date_start'].split('-')),
      end: new Date(fields['date_end'].split('-')),
    };
    event.keywords = fields['tags'] ? fields['tags'].split(/(?:,| )+/)  : [];

    const arrondissment = String(fields['address']).match(/750[0-2][0-9]/);
    event.arrondissment = arrondissment ? String(arrondissment[0]) : undefined;

    return event;
  }

}
