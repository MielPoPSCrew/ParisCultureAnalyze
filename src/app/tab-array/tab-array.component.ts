import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

// mock
import { mockCleanDataArray } from '../../mocks/mockCleanDataArray';

@Component({
    selector: 'app-tab-array',
    templateUrl: './tab-array.component.html',
    styleUrls: ['./tab-array.component.scss']
})
export class TabArrayComponent implements OnInit {

    public displayedColumns = ['coords', 'link', 'title', 'type', 'dp', 'info'];
    public dataSource: MatTableDataSource<any>;
    public mockCleanDataArray = mockCleanDataArray;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor() { }

    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.mockCleanDataArray.data);
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
