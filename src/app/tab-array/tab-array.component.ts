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
    public formattedData: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Input('initialData') initialData: ParisCultureAnalyse;

    constructor() { }

    ngOnInit() {
        this.formattedData = [];

        // TODO : map data with relevant fields (ex: description is nb seats + wathever)
        // Remove all useless fields because they will be used by filtering function
        this.initialData.arrondissements.map(quarter => {
            // console.log('events', quarter.events.items);
            // console.log('museums', quarter.museums.items);
            // console.log('cinemas', quarter.cinemas.items);

            // TODO : deal with description for each type
            quarter.events.items.map(item => {
                console.log(item);
                const nItem = <ArrayItem>{};

                nItem.name = item.name;
                nItem.description = item.description;
                nItem.address = item.address;
                nItem.coordinate = item.coordinate;
                nItem.arrondissment = item.arrondissment;
                nItem.type = 'event';

                this.formattedData.push(nItem);
            });
            quarter.museums.items.map(item => {
                const nItem = <ArrayItem>{};

                nItem.name = item.name;
                nItem.description = '';
                // nItem.description = item.description;
                nItem.address = item.address;
                nItem.coordinate = item.coordinate;
                nItem.arrondissment = item.arrondissment;
                nItem.type = 'museum';

                this.formattedData.push(nItem);
            });
            quarter.cinemas.items.map(item => {
                const nItem = <ArrayItem>{};

                nItem.name = item.name;
                nItem.description = '';
                // nItem.description = item.description;
                nItem.address = item.address;
                nItem.coordinate = item.coordinate;
                nItem.arrondissment = item.arrondissment;
                nItem.type = 'cinema';

                this.formattedData.push(nItem);
            });
        });

        // console.log(this.formattedData);
        this.dataSource = new MatTableDataSource(this.formattedData);
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    // TODO : deal with filters because they doesn't work properly
    // It's certainly linked to irrelevant fields
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
    coordinate: Coordinate;
    arrondissment: string;
    type: string;
}
