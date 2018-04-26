import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { environment } from '../../environments/environment';

// Services
import { ParisCultureService, ParisCultureAnalyse } from '../services/paris-culture.service';

@Component({
    selector: 'app-tab-analyze',
    templateUrl: './tab-analyze.component.html',
    styleUrls: ['./tab-analyze.component.scss']
})
export class TabAnalyzeComponent implements OnInit {
    public chartType = 'pie';
    public dataSelected = 'Events';
    public env = environment;
    public chartLabels: string[];
    public chartData: number[];
    public chartOptions: any;
    public isSorted = false;
    public shouldRefresh = true;
    public chartColors: any[];
    public initialData: ParisCultureAnalyse;
    public formattedData: any;

    constructor(private parisCultureServcice: ParisCultureService) { }

    ngOnInit() {
        this.chartLabels = this.env.cpList;
        this.chartColors = this.env.colorList;
        this.formattedData = {
            events: [],
            museums: [],
            cinemas: []
        };

        this.parisCultureServcice.getParisCultureAnalyse().subscribe(data => {
            this.initialData = data;
            console.log('initialData', this.initialData);

            this.initialData.arrondissements.sort(this.sortByPostcode).map(quarter => {
                this.formattedData.events.push(quarter.events.nbItems);
                this.formattedData.museums.push(quarter.museums.nbItems);
                this.formattedData.cinemas.push(quarter.cinemas.nbItems);
            });

            console.log('formattedData', this.formattedData);
            this.initChartData();
        });
    }

    initChartOptions = () => {
        this.chartOptions = {
            legend: {
                position: 'right',
                labels: {
                    fontSize: 14
                }
            }
        };
    }

    initChartData = () => {
        // To force refresh...
        this.shouldRefresh = !this.shouldRefresh;

        this.initChartOptions();

        this.chartLabels = this.env.cpList;
        this.chartColors = this.env.colorList;

        this.chartData = this.formatDataToSort(this.formattedData[this.dataSelected.toLowerCase()]);
        // switch (this.dataSelected) {
        //     case 'Events': break;
        //     case 'Museums': this.chartData = this.formatDataToSort(this.formattedData.museums); break;
        //     case 'Cinemas': this.chartData = this.formatDataToSort(this.formattedData.cinemas); break;
        // }

        if (this.isSorted) {
            this.chartLabels = [];
            this.chartColors = [{ backgroundColor: [] }];
            this.chartData.sort(this.sortValues).map(this.sortLabels);
            this.chartLabels.map(this.sortColors);
        }

        if (this.chartType === 'pie' || this.chartType === 'doughnut') {
            const tmpData = this.chartData;
            this.chartData = [];
            tmpData.map(this.flattenObject);
        }

        if (this.chartType === 'bar') {
            this.chartOptions.scales = {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            };
        }

        console.log('data', this.chartData);
        console.log('labels', this.chartLabels);
        console.log('colors', this.chartColors);
    }

    formatDataToSort = (data) => {
        const newFormat = [];

        data.map((label, index) => {
            newFormat.push({
                data: [data[index]],
                label: this.chartLabels[index],
                backgroundColor: this.env.cpColorList[this.chartLabels[index]]
            });
        });

        return newFormat;
    }

    sortByPostcode = (a, b) => a.postcode - b.postcode;
    sortValues = (a, b) => b.data[0] - a.data[0];
    sortLabels = data => { this.chartLabels.push(data.label); };
    sortColors = data => { this.chartColors[0].backgroundColor.push(this.env.cpColorList[data]); };
    flattenObject = data => { this.chartData.push(data.data[0]); };
}
