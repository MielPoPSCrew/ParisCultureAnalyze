import { Component, OnInit, Input } from '@angular/core';

// Assets
import { environment } from '../../environments/environment';

// Services
import { ParisCultureAnalyse } from '../services/paris-culture.service';
import { XmlExportService } from '../services/xml-export.service';

// Lodash
import _cloneDeep from 'lodash-es/cloneDeep';

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

    @Input('initialData') initialData: ParisCultureAnalyse;

    constructor(private xmlExportService: XmlExportService) {
        // console.log('Tab export constructed', this.initialData);
    }

    ngOnInit() {
        console.log(this.initialData);
        this.filteredData = this.initialData;
        this.selectedCp = this.env.cpList;
        this.selectedType = this.env.typeList;

    }

    download() {
        console.log(this.initialData);
        const xml = this.xmlExportService.getParisCultureAnalyseAsXml(this.filteredData);
        this.downloadXMLFile(xml, 'XMLProjectData_' +  new Date().getTime() + '.xml', 'text/plain');
    }

    downloadXMLFile(content, fileName, contentType) {
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

    filterData() {
        this.filteredData = _cloneDeep(this.initialData);
        this.filteredData.arrondissements = this.filteredData.arrondissements.filter(this.filterByPostcode).map(this.filterByType);

        console.log(this.filteredData);
    }

    isSelected(item: string, list: string[]) {
        return list.includes(item);
    }

    filterByPostcode = quarter => this.isSelected(quarter.postcode, this.selectedCp);
    filterByType = quarter => {
        if (!this.selectedType.includes('Events')) {
            quarter.nbItems -= quarter.events.nbItems;
            quarter.events = { nbItems: 0, items: [] };
        }

        if (!this.selectedType.includes('Cinemas')) {
            quarter.nbItems -= quarter.cinemas.nbItems;
            quarter.cinemas = { nbItems: 0, items: [] };
        }

        if (!this.selectedType.includes('Museums')) {
            quarter.nbItems -= quarter.museums.nbItems;
            quarter.museums = { nbItems: 0, items: [] };
        }

        return quarter;
    }
}
