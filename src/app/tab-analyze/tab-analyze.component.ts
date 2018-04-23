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
    // @ViewChild('currentChart')
    // currentChart: BaseChartDirective;

    public chartType = 'pie';
    public dataSelected = 'Events';
    public env = environment;
    public chartLabels: string[];
    public chartData: number[];
    public chartOptions: any;
    public mockCleanDataAnalyze = mockCleanDataAnalyze;
    public formattedData: any;
    public isSorted = false;
    public shouldRefresh = true;

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
        // To force refresh...
        this.shouldRefresh = !this.shouldRefresh;
        this.chartLabels = this.env.cpList;
        switch (this.dataSelected) {
            case 'Events': this.chartData = this.formatDataToSort(this.mockCleanDataAnalyze.events); break;
            case 'Museums': this.chartData = this.formatDataToSort(this.mockCleanDataAnalyze.museums); break;
            case 'Cinemas': this.chartData = this.formatDataToSort(this.mockCleanDataAnalyze.cinemas); break;
        }

        if (this.isSorted) {
            this.chartLabels = [];
            this.chartData.sort(this.sortValues).map(this.sortLabels);
        }

        if (this.chartType === 'pie' || this.chartType === 'doughnut') {
            const tmpData = this.chartData;
            this.chartData = [];
            tmpData.map(this.flattenObject);
        }
        console.log('data', this.chartData);
        console.log('labels', this.chartLabels);
    }

    formatDataToSort = (data) => {
        const newFormat = [];

        data.map((label, index) => {
            newFormat.push({ data: [data[index]], label: this.chartLabels[index] });
        });

        return newFormat;
    }

    sortValues = (a, b) => b.data[0] - a.data[0];
    sortLabels = data => { this.chartLabels.push(data.label); };
    flattenObject = (data, i) => { this.chartData.push(data.data[0]); };
}

// DO NOT REMOVE : OLD STUFF
// if (this.chartType === 'pie' || this.chartType === 'doughnut') {
//     switch (this.dataSelected) {
//         case 'events': this.chartData = this.formatDataToSort(this.mockCleanDataAnalyze.events); break;
//         case 'museums': this.chartData = this.formatDataToSort(this.mockCleanDataAnalyze.museums); break;
//         case 'cinemas': this.chartData = this.formatDataToSort(this.mockCleanDataAnalyze.cinemas); break;
//     }
//     if (this.isSorted) {
//         this.chartLabels = [];
//         this.chartData.sort(this.sortValues).map(this.sortLabels);
//         const tmpData = this.chartData;
//         this.chartData = [];
//         tmpData.map((data) => {
//             console.log(data);
//             this.chartData.push(data.data[0]);
//         });
//     }
// }
// if (this.chartType === 'bar') {
//     switch (this.dataSelected) {
//         case 'events': this.chartData = this.formatDataToSort(this.mockCleanDataAnalyze.events); break;
//         case 'museums': this.chartData = this.formatDataToSort(this.mockCleanDataAnalyze.museums); break;
//         case 'cinemas': this.chartData = this.formatDataToSort(this.mockCleanDataAnalyze.cinemas); break;
//     }

//     if (this.isSorted) {
//         this.chartLabels = [];
//         this.chartData.sort(this.sortValues).map(this.sortLabels);
//     }
//     // console.log('chartLabels', this.chartLabels);
// }

// console.log('data', this.chartData);
// console.log('labels', this.chartLabels);