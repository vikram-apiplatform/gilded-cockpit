import { Component, OnInit, Input } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {APIService} from '../api.service';

@Component({
  selector: 'app-automation-report',
  templateUrl: './automation-report.component.html',
  styleUrls: ['./automation-report.component.scss']
})
export class AutomationReportComponent implements OnInit {

  isExpanded = true;
  state = 'collapsed';

  currentActiveIndex = -1;

  buildData: any;

  showBuild = false;
  @Input() buildsData: any;
  @Input() projectData: any;
  currentBuild: any;
  buildDataLoading = false;
  componentLoading = true;
  isError = false;

  //chart
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Passed' },
    { data: [], label: 'Failed' },
    { data: [], label: 'Skipped' }
  ];

  public lineChartLabels: Label[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{}],
      xAxes: []
    }

  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(15, 250, 73, 0.78)',
      backgroundColor: 'rgba(0, 204, 51, 0.16)',
    },
    {
      borderColor: 'rgba(251, 92, 65, 0.86)',
      backgroundColor: 'rgba(204, 0, 0, 0.16)',
    },
    {
      borderColor: 'rgba(10, 14, 11, 0.33)',
      backgroundColor: 'rgba(10, 14, 11, 0.11)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  //chart

  partner = localStorage.getItem('partner');
  account_id = localStorage.getItem('account');

  constructor(public confPost: APIService) { }

  ngOnInit() {
    // this.confPost.getAutomationResults( 'partner=' + 'dev-gilded' + '&buildStatus=success&sort=-startedAt').subscribe(response => {
    //   this.buildsData = response;
    //   this.setChartData();
    //   if (this.buildsData.length === 0) {
    //     this.isError = true;
    //   };
    //   this.componentLoading = false;
    // }, error => {
    //   setTimeout(() => {
    //     // this.router.navigateByUrl('/console');
    //   }, 5000);
    // });
    this.setChartData();
    this.componentLoading = false;
  }

  setChartData() {
    if (this.buildsData) {
      for (let i = this.buildsData.length - 1; i >= 0; i--) {
        const data = this.buildsData[i];
        if (data.hasOwnProperty('passed') && data.hasOwnProperty('failed') && data.hasOwnProperty('skipped') && data.hasOwnProperty('id')) {
          // @ts-ignore
          this.lineChartData[0].data.push(data.passed);
          // @ts-ignore
          this.lineChartData[1].data.push(data.failed);
          // @ts-ignore
          this.lineChartData[2].data.push(data.skipped);

          this.lineChartLabels.push('#' + data.id);
        }
      }
    }
  }

  setResult(buildId, index) {
    this.showBuild = true;
    this.buildDataLoading = true;

    this.currentActiveIndex = index;
    this.currentBuild = this.buildsData[index];
    this.confPost.getAutomationBuildResults('buildId=' + buildId + '&fields=buildId,name,displayName,startedAt,endedAt,status').subscribe(response => {
      this.buildData = response;
      this.buildDataLoading = false;
    }, error => {
      this.showBuild = false;
    });
  }

  getDataAndTime(timeStamp) {
    if (timeStamp) {
      const date_ob = new Date(timeStamp);
      let hours = date_ob.getHours();
      const minutes = ('0' + date_ob.getMinutes()).slice(-2);
      const seconds = ('0' + date_ob.getSeconds()).slice(-2);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;


      return (date_ob.toDateString()) + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    } else {
      return '-';
    }
  }

  hasViewPagePermissions() {
    return true;
  }
}
