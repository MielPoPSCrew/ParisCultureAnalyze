import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
    selector: 'app-tab-analyze',
    templateUrl: './tab-analyze.component.html',
    styleUrls: ['./tab-analyze.component.css']
})
export class TabAnalyzeComponent implements OnInit {
    @ViewChild('currentChart')
    currentChart: BaseChartDirective;
    // private originalClick

    public chartType = 'pie';
    public baseData = 'events';

    constructor() { }

    ngOnInit() {
        // originalClick = this.currentChart.chart.legend.onClick;
        // console.log(this.currentChart);
    }

    // tslint:disable-next-line:member-ordering
    public pieChartLabels: string[] = ['75001', '75002', '75003', '75004', '75005', '75006', '75007', '75008',
     '75009', '75010', '75011', '75012', '75013', '75014', '75015', '75016', '75017', '75018', '75019', '75020'];
    // tslint:disable-next-line:member-ordering
    public pieChartData: number[] = [12, 4, 7, 3, 2, 2, 4, 6, 1, 17, 5, 3, 11, 9, 7, 4, 2, 7, 1, 10];

    // tslint:disable-next-line:member-ordering
    public chartOptions = {
        legend: {
            position: 'right',
            labels: {
              fontSize: 14
            },
            // onClick: (event, legendItem) => {
            //    this.filterData(legendItem.text);
            // }
        }
    };

    // filterData(toggleFilter) {
    //     console.log(this.currentChart);
    //     this.currentChart.chart.legend.onClick = function(e, legendItem) {
    //         this.original.call(this, e, legendItem);
    //         console.log('HEHEHEHE');
    //     };
    // }

    // events
    // public chartClicked(e: any): void {
    //     console.log(e);
    // }

    // public chartHovered(e: any): void {
    //     console.log(e);
    // }
}
