import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { flatMap, tap, map, toArray, shareReplay, filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { Coordinate } from '../../shared/Coordinate';

export interface Museum {
  name: string;
  website: string;
  address: string;
  coordinate: Coordinate;
  arrondissment: string;
}

@Injectable()
export class MuseumService {

  private museums: Observable<Museum[]>;

  constructor(private http: HttpClient) {
    this.museums = this.buildMuseumsObservable();
  }

  public getMuseums(): Observable<Museum[]> {
    return this.museums;
  }

  public buildMuseumsObservable(): Observable<Museum[]> {
    return this.http.get<any>('./data/museums.json')
    .pipe(
      flatMap(jsonArray => jsonArray),
      filter(jsonArray => jsonArray['fields']['ville'] === 'PARIS'),
      map(json => this.rawToMuseum(json)),
      filter(museum => museum.arrondissment !== undefined),
      toArray(),
      shareReplay()
    );
  }

  private rawToMuseum(json: any): Museum {
    const fields = json['fields'];

    const museum = <Museum>{};
    museum.name = fields['nom_du_musee'];
    museum.website = fields['sitweb'];
    museum.address = fields['adr'];
    museum.coordinate = {
      latitude: fields['coordonnees_'] ? fields['coordonnees_'][0] : null,
      longitude: fields['coordonnees_'] ? fields['coordonnees_'][1] : null
    };

    const arrondissment = String(fields['cp']).match(/750[0-2][0-9]/);
    museum.arrondissment = arrondissment ? String(arrondissment[0]) : undefined;

    return museum;
  }

}
