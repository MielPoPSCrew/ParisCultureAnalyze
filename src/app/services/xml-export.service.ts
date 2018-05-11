import { Injectable } from '@angular/core';
import { Cinema } from './cinema.service';
import { Coordinate } from '../../shared/Coordinate';
import { Event } from './event.service';
import { Museum } from './museum.service';
import { Arrondissement, ParisCultureAnalyse } from './paris-culture.service';
import * as jsontoxml from 'jsontoxml';
import * as xmlformater from 'xml-formatter';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class XmlExportService {

  constructor(private sanitizer: DomSanitizer) { }

  /**
   * Return a safe url to be used like in this example :
   * <a [href]="safeUrl" download="export.xml">click to download</a>
   * @param xml an XML string
   */
  public getXmlAsDownlodableFile(xml: string): SafeUrl {
    const blob: Blob = new Blob([xml], { type: 'text/xml' });
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
  }

  /**
   * Return a pretty formated XML string of data.
   * @param data An instance of ParisCultureAnalyse
   */
  public getParisCultureAnalyseAsXml(data: ParisCultureAnalyse): string {
    const jsonXml = this.getParisCultureAnalyseAsJsonXml(data);
    const xml = jsontoxml(jsonXml, { escape: true, xmlHeader: true});
    return xmlformater(xml);
  }

  public getParisCultureAnalyseAsXsd(): string {
    const xsdFile = new XMLHttpRequest();
    xsdFile.open('GET', 'assets/xsd/paris-culture-analyse.xsd', false);
    xsdFile.send();
    console.log(xsdFile);
    return xsdFile.responseText;
  }

  private getParisCultureAnalyseAsJsonXml(data: ParisCultureAnalyse): any {
    const arrondissements: Arrondissement[] = [];
    data.arrondissements.forEach(item => arrondissements.push(this.getArrondissementAsJsonXml(item)));

    return [{
      name: 'arrondissements',
      children: arrondissements,
      attrs: {exportDate: Date.now()}
    }];
  }

  private getArrondissementAsJsonXml(data: Arrondissement): any {
    const cinemas: Cinema[] = [];
    data.cinemas.items.forEach(item => cinemas.push(this.getCinemaAsJsonXml(item)));

    const events: Cinema[] = [];
    data.events.items.forEach(item => events.push(this.getEventAsJsonXml(item)));

    const museums: Cinema[] = [];
    data.museums.items.forEach(item => museums.push(this.getMuseumAsJsonXml(item)));

    return [{
      name: 'arrondissement',
      children: [
        {
          name: 'cinemas',
          children: cinemas,
          attrs: { total: data.cinemas.nbItems }
        },
        {
          name: 'events',
          children: events,
          attrs: { total: data.events.nbItems }
        },
        {
          name: 'museums',
          children: museums,
          attrs: { total: data.museums.nbItems }
        }
      ],
      attrs: {postcode: data.postcode, total: data.nbItems}
    }];
  }


  private getMuseumAsJsonXml(data: Museum): any {
    return [{
      name: 'museum',
      children: [
        { name: 'name', text: data.name },
        { name: 'website', text: data.website },
        { name: 'address', text: data.address },
        this.getCoordinateaAsJsonXml(data.coordinate),
      ],
      attrs: {}
    }];
  }

  private getCinemaAsJsonXml(data: Cinema): any {
    return [{
      name: 'cinema',
      children: [
        { name: 'name', text: data.name },
        { name: 'address', text: data.address },
        this.getCoordinateaAsJsonXml(data.coordinate)
      ],
      attrs: {rooms: data.rooms, places: data.places}
    }];
  }

  private getEventAsJsonXml(data: Event): any {

    const keywordsXml: any[] = [];
    data.keywords.forEach(item => keywordsXml.push({ name: 'keyword', text: item}));

    const periodeXml = {
      periode: [
        { name: 'start', text: data.periode.start},
        { name: 'end', text: data.periode.end }
      ]
    };

    return [{
      name: 'event',
      children: [
        { name: 'name', text: data.name },
        { name: 'description', text: data.description },
        { name: 'details', text: data.details },
        { name: 'website', text: data.website },
        { name: 'place', text: data.place },
        { name: 'address', text: data.address },
        this.getCoordinateaAsJsonXml(data.coordinate),
        periodeXml,
        { keywords: keywordsXml },
      ],
      attrs: { }
    }];
  }

  private getCoordinateaAsJsonXml(data: Coordinate): any {
    return {
      coordinate: [
        { name: 'latitude', text: data.latitude },
        { name: 'longitude', text: data.longitude },
      ]
    };
  }

}
