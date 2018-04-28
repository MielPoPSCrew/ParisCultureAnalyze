import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

// mock
import { mockCleanDataArray } from '../../mocks/mockCleanDataArray';

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
    public mockCleanDataArray = mockCleanDataArray;
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

            // TODO : deal with Event/Museum/Item types
            // quarter.events.items.map(item => { item.type = 'event'; });
            // quarter.museums.items.map(item => { item.type = 'museum'; });
            // quarter.cinemas.items.map(item => { item.type = 'cinema'; });

            this.formattedData = [
                ...this.formattedData,
                ...quarter.events.items,
                ...quarter.museums.items,
                ...quarter.cinemas.items
            ];
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
