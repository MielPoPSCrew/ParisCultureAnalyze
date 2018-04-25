import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { last, flatMap, tap, map, toArray, shareReplay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { Museum, MuseumService } from './museum.service';
import { Event, EventService } from './event.service';
import { Cinema, CinemaService } from './cinema.service';
import { merge } from 'rxjs/observable/merge';

export interface Arrondissement {
    postcode: string;
    nbItems: number;
    museums: {
      nbItems: number;
      items: Museum[];
    };
    events: {
      nbItems: number;
      items: Event[];
    };
    cinemas: {
      nbItems: number;
      items: Cinema[];
    };
}

export interface ParisCultureAnalyse {
  arrondissements: Arrondissement[];
}

@Injectable()
export class ParisCultureService {

  culture: ParisCultureAnalyse;
  culture$: Observable<ParisCultureAnalyse>;

  constructor(
    private cinema: CinemaService,
    private museum: MuseumService,
    private event: EventService,
  ) {
    this.culture = <ParisCultureAnalyse>{ arrondissements: [] };
    this.culture$ = this.buildCultureObservable();
  }

  public getParisCultureAnalyse(): Observable<ParisCultureAnalyse> {
    return this.culture$;
  }

  private buildCultureObservable(): Observable<ParisCultureAnalyse> {
    return merge(
      this.cinema.getCinemas().pipe(map(cinemas => this.insertCinemas(cinemas))),
      this.museum.getMuseums().pipe(map(museum => this.insertMuseums(museum))),
      this.event.getEvents().pipe(map(event => this.insertEvents(event))),
    ).pipe(
      last(),
      shareReplay(1)
    );
  }

  private insertCinemas(cinemas: Cinema[]): ParisCultureAnalyse {

    cinemas.map(aCinema => {
      const arrondissement = this.getArrondissement(aCinema.arrondissment);
      arrondissement.cinemas.items.push(aCinema);
      arrondissement.cinemas.nbItems++;
      arrondissement.nbItems++;
    });

    return this.culture;
  }

  private insertEvents(events: Event[]): ParisCultureAnalyse {
    events.map(anEvent => {
      const arrondissement = this.getArrondissement(anEvent.arrondissment);
      arrondissement.events.items.push(anEvent);
      arrondissement.events.nbItems++;
      arrondissement.nbItems++;
    });

    return this.culture;
  }

  private insertMuseums(museums: Museum[]): ParisCultureAnalyse {
    museums.map(aMuseum => {
      const arrondissement = this.getArrondissement(aMuseum.arrondissment);
      arrondissement.museums.items.push(aMuseum);
      arrondissement.museums.nbItems++;
      arrondissement.nbItems++;
    });

    return this.culture;
  }

  private getArrondissement(withPostcode: string): Arrondissement {
    let arrondissement = this.culture.arrondissements.filter(arr => arr.postcode === withPostcode)[0];

    if (!arrondissement) {
      arrondissement = <Arrondissement>{
        postcode: withPostcode,
        nbItems: 0,
        museums: {
          nbItems: 0,
          items: [],
        },
        events: {
          nbItems: 0,
          items: [],
        },
        cinemas: {
          nbItems: 0,
          items: [],
        },
      };

      this.culture.arrondissements.push(arrondissement);
    }

    return arrondissement;
  }
}
