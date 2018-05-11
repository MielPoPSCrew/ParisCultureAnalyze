import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { flatMap, tap, map, toArray, shareReplay, filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { Coordinate } from '../../shared/Coordinate';

export interface Cinema {
  name: string;
  rooms: number;
  places: number;
  address: string;
  coordinate: Coordinate;
  arrondissment: string;
}

@Injectable()
export class CinemaService {

  private cinema$: Observable<Cinema[]>;

  constructor(private http: HttpClient) {
    this.cinema$ = this.buildCinemasObservable();
  }

  public getCinemas(): Observable<Cinema[]> {
    return this.cinema$;
  }

  private buildCinemasObservable(): Observable<Cinema[]> {
    return this.http.get<any>('./data/cinemas.json')
    .pipe(
      flatMap(jsonArray => jsonArray),
      map(json => this.rawToCinema(json)),
      filter(cinema => cinema.arrondissment !== undefined),
      toArray(),
      shareReplay(1)
    );
  }

  private rawToCinema(json: any): Cinema {
    const fields = json['fields'];

    const cinema = <Cinema>{};

    cinema.name = fields['nom_etablissement'];
    cinema.address = fields['adresse'];
    fields['ecrans'] = fields['ecrans'].replace(/\s/g, '');
    cinema.rooms = fields['ecrans'];
    fields['fauteuils'] = fields['fauteuils'].replace(/\s/g, '');
    cinema.places = fields['fauteuils'];
    cinema.coordinate = {
      latitude: fields['coordonnees'] ? fields['coordonnees'][0] : null,
      longitude: fields['coordonnees'] ? fields['coordonnees'][1] : null
    };

    const arrondissment = String(fields['arrondissement']).match(/750[0-2][0-9]/);
    cinema.arrondissment = arrondissment ? String(arrondissment[0]) : undefined;


    return cinema;
  }

}
