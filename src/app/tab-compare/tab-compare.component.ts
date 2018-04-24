import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { environment } from '../../environments/environment';

// mock
import { mockCleanDataCompare } from '../../mocks/mockCleanDataCompare';

@Component({
    selector: 'app-tab-compare',
    templateUrl: './tab-compare.component.html',
    styleUrls: ['./tab-compare.component.css']
})
export class TabCompareComponent implements OnInit {

    public env = environment;
    public mockCleanDataCompare = mockCleanDataCompare;
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

    constructor() { }

    ngOnInit() {
        this.chartsColors = this.env.colorList;
        this.quarterSelected_1 = this.env.cpList[0];
        this.quarterSelected_2 = this.env.cpList[1];

        this.initChartsOptions();
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

        if (this.dataSelected.includes('Events')) {
            this.dataChart_1.push(this.mockCleanDataCompare[this.quarterSelected_1].events);
            this.dataChart_2.push(this.mockCleanDataCompare[this.quarterSelected_2].events);
        }

        if (this.dataSelected.includes('Museums')) {
            this.dataChart_1.push(this.mockCleanDataCompare[this.quarterSelected_1].museums);
            this.dataChart_2.push(this.mockCleanDataCompare[this.quarterSelected_2].museums);
        }

        if (this.dataSelected.includes('Cinemas')) {
            this.dataChart_1.push(this.mockCleanDataCompare[this.quarterSelected_1].cinemas);
            this.dataChart_2.push(this.mockCleanDataCompare[this.quarterSelected_2].cinemas);
        }

        console.log('initChartsData');
        console.log(this.dataChart_1);
        console.log(this.dataChart_2);
    }

}
