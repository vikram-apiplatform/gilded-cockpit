import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {APIService} from '../api.service';

@Component({
  selector: 'app-automation-dashboard',
  templateUrl: './automation-dashboard.component.html',
  styleUrls: ['./automation-dashboard.component.scss']
})
export class AutomationDashboardComponent implements OnInit {

  public canvasWidth = 250
  public needleValue = 0
  public centralLabel = ''
  public name = 'Heath Meter'
  public bottomLabel = '81%'
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

  countryColumns = ['Project', 'UAE', 'INDIA', 'USA'];
  componentLoading = true;

  showBuildAnalytics = false;
  projectData: any;
  buildsData: any;


  constructor(public confPost: APIService) { }

  ngOnInit() {

    this.confPost.getAutomationProjects( 'partner=' + 'dev-gilded').subscribe(projects => {

      let projectData: any;
      projectData = projects;

      const promises = [];

      for (const project of projectData) {
        promises.push(this.getAutomationResultForProject(project));
      }

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

            this.filterDataWithQuery(1, {geoLocation: ['US']});
            this.filterDataWithQuery(1, {geoLocation: ['IN']});
            this.componentLoading = false;
          });
    });
  }

  async getAutomationResultForProject(project) {
    return new Promise(async (resolve, reject) => {
      this.confPost.getAutomationResults('projectId=' + project['id'] + '&partner=' + 'dev-gilded' + '&buildStatus=success&sort=-startedAt').subscribe(response => {
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

  openFilterData(projectIndex, querydata) {
    const filteredArr = this.filterDataWithQuery(projectIndex, querydata);

    this.buildsData = filteredArr;
    this.projectData = this.projects[projectIndex]['project'];

    if (this.buildsData.length > 0) {
      this.showBuildAnalytics = true;
    }
  }

}
