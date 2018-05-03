import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Coordinate } from '../../shared/Coordinate';

// Services
import { ParisCultureAnalyse } from '../services/paris-culture.service';

@Component({
    selector: 'app-tab-array',
    templateUrl: './tab-array.component.html',
    styleUrls: ['./tab-array.component.scss']
})
export class TabArrayComponent implements OnInit {

    public displayedColumns = ['coords', 'link', 'name', 'type', 'dp', 'info'];
    public dataSource: MatTableDataSource<any>;
    public formattedData: ArrayItem[];
    private dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Input('initialData') initialData: ParisCultureAnalyse;

    constructor() {
        this.formattedData = [];
    }

    ngOnInit() {
        this.initialData.arrondissements.map(quarter => {
            quarter.events.items.map(item => {
                const nItem = <ArrayItem>{};

                nItem.name = item.name;
                nItem.description = item.description;
                nItem.address = item.address;
                nItem.website = item.website;
                nItem.coordinate = item.coordinate;
                nItem.arrondissment = item.arrondissment;
                nItem.type = 'event';
                nItem.date = item.periode.start.toLocaleDateString('fr-FR', this.dateOptions);
                this.formattedData.push(nItem);
            });
            quarter.museums.items.map(item => {
                const nItem = <ArrayItem>{};

                nItem.name = item.name;
                nItem.description = item.address;
                nItem.address = item.address;
                nItem.website = item.website;
                nItem.coordinate = item.coordinate;
                nItem.arrondissment = item.arrondissment;
                nItem.type = 'museum';

                this.formattedData.push(nItem);
            });
            quarter.cinemas.items.map(item => {
                const nItem = <ArrayItem>{};
                console.log(item);

                nItem.name = item.name;
                nItem.description = item.address
                    + ' - '
                    + item.rooms
                    + ' salle'
                    + (item.rooms > 1 ? 's' : '')
                    + ' - '
                    + item.places
                    + ' places';
                nItem.address = item.address;
                nItem.coordinate = item.coordinate;
                nItem.arrondissment = item.arrondissment;
                nItem.type = 'cinema';

                this.formattedData.push(nItem);
            });
        });

        this.dataSource = new MatTableDataSource(this.formattedData);
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }
}

interface ArrayItem {
    name: string;
    description: string;
    address: string;
    website?: string;
    coordinate: Coordinate;
    arrondissment: string;
    type: string;
    date?: string;
}
