import { Component, OnInit, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { environment } from '../../environments/environment';

// Services
import { ParisCultureAnalyse } from '../services/paris-culture.service';

@Component({
    selector: 'app-tab-compare',
    templateUrl: './tab-compare.component.html',
    styleUrls: ['./tab-compare.component.scss']
})
export class TabCompareComponent implements OnInit {

    public env = environment;
    public chartsType = 'pie';
    public dataSelected = ['Events', 'Museums', 'Cinemas'];
    public quarterSelected_1: string;
    public quarterSelected_2: string;
    public dataChart_1: number[];
    public dataChart_2: number[];
    public chartsColors: any;
    public chart1Options: any;
    public chart2Options: any;
    public shouldRefresh = true;
    public formattedData: any;

    @Input('initialData') initialData: ParisCultureAnalyse;

    constructor() { }

    ngOnInit() {
        this.chartsColors = this.env.colorList;
        this.quarterSelected_1 = this.env.cpList[0];
        this.quarterSelected_2 = this.env.cpList[1];

        this.formattedData = {
            events: [],
            museums: [],
            cinemas: []
        };

        this.initChartsOptions();

        this.initialData.arrondissements.sort(this.sortByPostcode).map(quarter => {
            this.formattedData.events.push(quarter.events.nbItems);
            this.formattedData.museums.push(quarter.museums.nbItems);
            this.formattedData.cinemas.push(quarter.cinemas.nbItems);
        });

        this.initChartsData();
    }

    initChartsOptions = () => {
        this.chart1Options = {
            legend: {
                position: 'right',
                labels: {
                    fontSize: 14
                }
            }
        };
        this.chart2Options = {
            legend: {
                position: 'left',
                labels: {
                    fontSize: 14
                },
                display: false
            }
        };
    }

    initChartsData = () => {
        // To force refresh...
        this.shouldRefresh = !this.shouldRefresh;

        this.dataChart_1 = [];
        this.dataChart_2 = [];

        this.initChartsOptions();

        if (this.chartsType === 'bar') {
            this.chart1Options.scales = {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            };

            this.chart2Options.scales = {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            };

            this.chart1Options.legend = {
                display: false
            };
        }

        const indexQuarter1 = parseInt(this.quarterSelected_1, 10) - 75001;
        const indexQuarter2 = parseInt(this.quarterSelected_2, 10) - 75001;

        if (this.dataSelected.includes('Events')) {
            this.dataChart_1.push(this.formattedData.events[indexQuarter1]);
            this.dataChart_2.push(this.formattedData.events[indexQuarter2]);
        }

        if (this.dataSelected.includes('Museums')) {
            this.dataChart_1.push(this.formattedData.museums[indexQuarter1]);
            this.dataChart_2.push(this.formattedData.museums[indexQuarter2]);
        }

        if (this.dataSelected.includes('Cinemas')) {
            this.dataChart_1.push(this.formattedData.cinemas[indexQuarter1]);
            this.dataChart_2.push(this.formattedData.cinemas[indexQuarter2]);
        }
    }

    sortByPostcode = (a, b) => a.postcode - b.postcode;
}
