import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { environment } from '../../environments/environment';

// mock
import { mockCleanDataAnalyze } from '../../mocks/mockCleanDataAnalyze';

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
    public env = environment;
    public chartLabels: string[];
    public chartData: number[];
    public chartOptions: any;
    public mockCleanDataAnalyze = mockCleanDataAnalyze;
    public formattedData: any;

    constructor() { }

    ngOnInit() {
        this.chartLabels = this.env.cpList;
        this.chartOptions = {
            legend: {
                position: 'right',
                labels: {
                  fontSize: 14
                }
            }
        };

        this.initChartData();
    }

    initChartData = () => {
        if (this.chartType === 'pie' || this.chartType === 'doughnut') {
            switch (this.baseData) {
                case 'events': this.chartData = this.mockCleanDataAnalyze.events; break;
                case 'museums': this.chartData = this.mockCleanDataAnalyze.museums; break;
                case 'cinemas': this.chartData = this.mockCleanDataAnalyze.cinemas; break;
            }
        }
        if (this.chartType === 'bar') {
            switch (this.baseData) {
                case 'events': this.chartData = this.formatDataForBarChart(this.mockCleanDataAnalyze.events); break;
                case 'museums': this.chartData = this.formatDataForBarChart(this.mockCleanDataAnalyze.museums); break;
                case 'cinemas': this.chartData = this.formatDataForBarChart(this.mockCleanDataAnalyze.cinemas); break;
            }
        }
    }

    formatDataForBarChart = (data) => {
        const newFormat = [];

        data.map((d, index) => {
            const tmpArray = [];
            data.map((dd, ii) => {
                if (index === ii) {
                    tmpArray.push(dd);
                } else {
                    tmpArray.push(0);
                }
            });
            newFormat.push(tmpArray);
        });

        console.log(newFormat);
        return newFormat;
    }
    // filterData(toggleFilter) {
    //     console.log(this.currentChart);
    //     this.currentChart.chart.legend.onClick = function(e, legendItem) {
    //         this.original.call(this, e, legendItem);
    //         console.log('HEHEHEHE');
    //     };
    // }
}
