import { Component, OnInit, Input, ViewChild } from '@angular/core';

// Assets
import { environment } from '../../environments/environment';

// Services
import { ParisCultureAnalyse } from '../services/paris-culture.service';
import { XmlExportService } from '../services/xml-export.service';

// Lodash
import _cloneDeep from 'lodash-es/cloneDeep';
import { MatDatepicker } from '@angular/material';

@Component({
    selector: 'app-tab-export',
    templateUrl: './tab-export.component.html',
    styleUrls: ['./tab-export.component.scss']
})
export class TabExportComponent implements OnInit {

    public env = environment;
    public filteredData: ParisCultureAnalyse;
    public selectedCp: string[];
    public selectedType: string[];
    public minRooms: number;
    public minSeats: number;
    public dateStart: Date;
    public dateEnd: Date;

    // tslint:disable-next-line:no-input-rename
    @Input('initialData') initialData: ParisCultureAnalyse;

    constructor(private xmlExportService: XmlExportService) {
        // console.log('Tab export constructed', this.initialData);
    }

    ngOnInit() {
        this.filteredData = this.initialData;
        this.selectedCp = this.env.cpList;
        this.selectedType = this.env.typeList;
        this.minRooms = 0;
        this.minSeats = 0;
        this.dateStart = new Date('1/1/2018');
        this.dateEnd = new Date('1/1/2020');
    }

    downloadXSD() {
        const xsd = this.xmlExportService.getParisCultureAnalyseAsXsd();
        this.downloadFile(xsd, 'XSD_ParisCultureAnalyse.xsd', 'text/plain');
    }

    downloadXML() {
        const xml = this.xmlExportService.getParisCultureAnalyseAsXml(this.filteredData);
        this.downloadFile(xml, 'XML_ParisCultureAnalyse' +  new Date().getTime() + '.xml', 'text/plain');
    }

    downloadFile(content, fileName, contentType) {
        const a = document.createElement('a');
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    toggleCpCheckbox(cp: string) {
        if (this.selectedCp.includes(cp)) {
            this.selectedCp = this.selectedCp.filter(n => n !== cp);
        } else {
            this.selectedCp.push(cp);
        }

        this.filterData();
    }

    toggleTypeCheckbox(type: string) {
        if (this.selectedType.includes(type)) {
            this.selectedType = this.selectedType.filter(n => n !== type);
        } else {
            this.selectedType.push(type);
        }

        this.filterData();
    }

    changeDate() {
        if (this.dateStart >= this.dateEnd) {
            this.dateStart = new Date(this.dateEnd);
        }

        this.filterData();
    }

    changeMins() {
        if (this.minRooms < 0) {
            this.minRooms = 0;
        }
        if (this.minSeats < 0) {
            this.minSeats = 0;
        }

        this.filterData();
    }

    filterData() {
        this.filteredData = _cloneDeep(this.initialData);
        this.filteredData.arrondissements = this.filteredData.arrondissements.filter(this.filterByPostcode).map(this.filterByType);
    }

    isSelected(item: string, list: string[]) {
        return list.includes(item);
    }

    filterByPostcode = quarter => this.isSelected(quarter.postcode, this.selectedCp);
    filterByType = quarter => {
        if (!this.selectedType.includes('Events')) {
            quarter.events = { nbItems: 0, items: [] };
        } else {
            quarter.events.items = quarter.events.items.filter(this.filterByDate);
            quarter.events.nbItems = quarter.events.items.length;
        }

        if (!this.selectedType.includes('Cinemas')) {
            quarter.cinemas = { nbItems: 0, items: [] };
        } else {
            quarter.cinemas.items = quarter.cinemas.items.filter(this.filterByNbRoomsAndSeats);
            quarter.cinemas.nbItems = quarter.cinemas.items.length;
        }

        if (!this.selectedType.includes('Museums')) {
            quarter.museums = { nbItems: 0, items: [] };
        }

        quarter.nbItems = quarter.events.nbItems + quarter.cinemas.nbItems + quarter.museums.nbItems;
        return quarter;
    }
    filterByNbRoomsAndSeats = cinema => parseInt(cinema.rooms, 10) >= this.minRooms && parseInt(cinema.places, 10) >= this.minSeats;
    filterByDate = event => new Date(event.periode.start) >= new Date(this.dateStart) && new Date(event.periode.start) <= new Date(this.dateEnd);
}
