import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {APIService} from '../api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-automation-dashboard',
  templateUrl: './automation-dashboard.component.html',
  styleUrls: ['./automation-dashboard.component.scss']
})
export class AutomationDashboardComponent implements OnInit {

  public canvasWidth = 200
  public needleValue = 0
  public centralLabel = ''
  public name: string
  public options = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['#f44041', '#fadb42', '#48ce49'],
    arcDelimiters: [40, 80],
    rangeLabel: ['0', '100'],
    needleStartValue: 50,
  }

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

  projects = [];
  projectsArray: any;

  countryColumns = ['PRODUCT',  'USA', 'UAE', 'INDIA'];
  componentLoading = true;

  showBuildAnalytics = false;
  projectData: any;
  buildsData: any;
  buildsCurrentActiveIndex = -1;

  queryTime = 'week';
  dateRanges = [
    {display_name: 'Past Day', range: 'day'},
    {display_name: 'Past Week', range: 'week'},
    {display_name: 'Past Month', range: 'month'},
    {display_name: 'Past Year', range: 'year'},
    {display_name: 'All Time', range: 'all'},
  ];

  ranges: any = {
    'Today': [moment(), moment()],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
  };

  selectedDateRange: {startDate: moment.Moment, endDate: moment.Moment} = {startDate: moment().subtract(6, 'days'), endDate: moment()};

  minDate = moment('2021-12-16', 'YYYY-MM-DD');
  maxDate = moment();

  constructor(public confPost: APIService) {}

  ngOnInit() {

    this.confPost.getAutomationProjects( 'partner=' + 'dev-gilded').subscribe(projects => {

      this.projectsArray = projects;
      this.getAutomationResultForProjects();
    });
  }

  projectsHasData() {
    if (this.projects.length > 0) {
      for (const project of this.projects) {
        if (project.data.length > 0) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }

  getAutomationResultForProjects() {
    const promises = [];

    if (this.projectsArray) {
      this.projects = [];

      for (const project of this.projectsArray) {
        promises.push(this.getAutomationResultForProject(project));
      }

      this.componentLoading = true;

      Promise.all(promises)
          .then(async (results) => {
            let totalTests = 0;
            let passedTests = 0;
            for (const project of this.projects) {
              for (const build of project.data) {
                totalTests = totalTests + build.tests;
                passedTests = passedTests + build.passed;
                this.needleValue = Math.floor(passedTests / totalTests * 100);
              }
            }
            this.name = 'Automation Health' + ': ' + this.needleValue + '%';
            this.showBuildAnalytics = false;
            this.componentLoading = false;
          });
    }
  }

  async getAutomationResultForProject(project) {
    return new Promise(async (resolve, reject) => {
      const d = new Date(Date.now());
      d.setDate(d.getDate() - 7);

      let query = 'projectId=' + project['id'] + '&partner=' + 'dev-gilded';
      // if (this.queryTime === 'week') {
      //   d.setDate(d.getDate() - 7);
      //   query += '&startedAt.gte=' + d.getTime();
      // } else if (this.queryTime === 'day') {
      //   d.setHours(d.getHours() - 24);
      //   query += '&startedAt.gte=' + d.getTime();
      // } else if (this.queryTime === 'month') {
      //   d.setDate(d.getDate() - 30);
      //   query += '&startedAt.gte=' + d.getTime();
      // } else if (this.queryTime === 'year') {
      //   d.setDate(d.getDate() - 365);
      //   query += '&startedAt.gte=' + d.getTime();
      // } else if (this.queryTime === 'all') {
      // } else {
      //   d.setDate(d.getDate() - 7);
      //   query += '&startedAt.gte=' + d.getTime();
      // }
      this.confPost.getAutomationResults('projectId=' + project['id'] + '&partner=' + 'dev-gilded' + '&startedAt.gte=' + this.selectedDateRange.startDate.startOf('day').valueOf() + '&endedAt.lte=' + this.selectedDateRange.endDate.endOf('day').valueOf() + '&buildStatus=success&sort=-startedAt').subscribe(response => {
        let result: any;
        result = response;

        const build = {
          data: result,
          noData: result.length === 0,
          project: project,
          lineChartData:  [
            { data: [], label: 'Passed' },
            { data: [], label: 'Failed' },
            { data: [], label: 'Skipped' }
          ],
          lineChartLabels: [],
          latestBuild: result.length === 0 ? null : result[0],
          doughnutChartData: result.length === 0 ? [0, 0, 0] : [result[0]['passed'], result[0]['failed'], result[0]['skipped']],
          doughnutChartLabels: ['Passed', 'Failed', 'Skipped'],
          chartType: 'doughnut',
          doughnutColors: [
            {
              backgroundColor: [
                '#00af00',
                '#f7464a',
                '#ff9900'
              ]
            }
          ],
          doughnutChartOptions: {
            responsive: false,
            legend: {
              display: true,
              position: 'right',

            },
            plugins: {
              title: {
                display: true,
                text: 'Tests',
                padding: {
                  top: 10,
                  bottom: 30
                }
              }
            }
          },
        }
        this.setChartData(build.data, build.lineChartData, build.lineChartLabels)
        this.projects.push(build);

        resolve('success');
      }, error => {
        resolve('failed');
      });
    });
  }

  setChartData(buildsData, lineChartData, lineChartLabels) {
    if (buildsData) {
      for (let i = buildsData.length - 1; i >= 0; i--) {
        const data = buildsData[i];
        if (data.hasOwnProperty('passed') && data.hasOwnProperty('failed') && data.hasOwnProperty('skipped') && data.hasOwnProperty('id')) {
          lineChartData[0].data.push(data.passed);
          lineChartData[1].data.push(data.failed);
          lineChartData[2].data.push(data.skipped);
          lineChartLabels.push('#' + (data.buildNumber ? data.buildNumber : data.id));
        }
      }
    }
  }

  filterDataWithQuery(projectIndex, querydata) {
    const keys = Object.keys(querydata)
    let filteredArr = [];

    if (keys.length > 0) {
      for (const build of this.projects[projectIndex].data) {
        for (const key of keys) {
          for (const val of querydata[key]) {
            if (build[key] && build[key] === val) {
              filteredArr.push(build)
            }
          }
        }
      }
    } else {
      filteredArr = JSON.parse(JSON.stringify(this.projects[projectIndex].data))
    }
    return filteredArr;
  }

  getCountryPassRate(projectIndex, querydata) {
    const filteredArr = this.filterDataWithQuery(projectIndex, querydata);

    if (filteredArr.length > 0) {
      return Math.floor(filteredArr[0].passed / filteredArr[0].tests * 100);
    } else {
      return 0;
    }
  }

  getCountryStatus(projectIndex, querydata) {
    const filteredArr = this.filterDataWithQuery(projectIndex, querydata);

    if (filteredArr.length > 0) {
      const passRate = Math.floor(filteredArr[0].passed / filteredArr[0].tests * 100);
      if (passRate <= 40) {
        return 'fa fa-times-circle icn-r'
      } else if (passRate > 40 && passRate < 80) {
        return 'fa fa-exclamation-triangle icn-y'
      } else {
        return 'fa fa-check-circle icn-g'
      }
    } else {
      return 'fa fa-times-circle icn-b'
    }
  }

  openFilterData(projectIndex, querydata, currentActiveIndex = -1 ) {
    const filteredArr = this.filterDataWithQuery(projectIndex, querydata);

    this.buildsData = filteredArr;
    this.projectData = this.projects[projectIndex]['project'];

    if (this.buildsData.length > 0) {
      this.buildsCurrentActiveIndex = currentActiveIndex
      this.showBuildAnalytics = true;
    }
  }

  getPassRate(passCount, total) {
    return Math.floor(passCount / total * 100);
  }

  getDate(timeStamp, dateWithSlash = false) {
    if (timeStamp) {
      const date_ob = new Date(timeStamp);
      let hours = date_ob.getHours();
      const minutes = ('0' + date_ob.getMinutes()).slice(-2);
      const seconds = ('0' + date_ob.getSeconds()).slice(-2);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;


      if (dateWithSlash) {
        return (date_ob.getMonth() + '/' + date_ob.getDate()) + '/' + date_ob.getFullYear() + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + ampm;
      } else {
        return (date_ob.toDateString()) + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + ampm;
      }
    } else {
      return '-';
    }
  }
}
