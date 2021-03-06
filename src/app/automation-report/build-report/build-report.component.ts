import {Component, Inject, Input, OnChanges, OnInit, Optional, SimpleChanges} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {LeftpanelComponent} from '../../leftpanel/leftpanel.component';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Color} from 'ng2-charts';
import {ChartOptions} from 'chart.js';
import {ImageViewerComponent} from '../../image-viewer/image-viewer.component';
import {APIService} from '../../api.service';

@Component({
  selector: 'app-build-report',
  templateUrl: './build-report.component.html',
  styleUrls: ['./build-report.component.scss']
})
export class BuildReportComponent implements OnInit, OnChanges {

  currentActiveIndex = 0;
  currentTestCaseData: any;
  currentTestCaseDataLoading = false;

  isDialogBox = false;

  currentTable = 'Test Setup';

  @Input() buildData;
  @Input() testCasesData;
  @Input() reportName: string;
  showAssertionDetails = [];
  columnsToDisplay = ['Test Case Name', 'Status', 'Assertion Status'];
  expandedElement;
  exceptions = [];

  showDashboardData = true;
  showFailureData = false;
  showTestacasesData = false;
  currentTestCase = '';
  currentFailedTestCase = '';
  testCases = [];
  failedTestCases = [];
  currentTestcaseResponse = [];
  testCaseFilter = ['success', 'failed', 'skipped'];

  totalTests = 0;
  totalPassedTests = 0;
  totalFailedTests = 0;
  totalSkippedTests = 0;

  totalAssertions = 0;
  totalPassedAssertions = 0;
  totalFailedAssertions = 0;
  totalSkippedAssertions = 0;


  noTestFlag = false;

  chartLabels: string[] = ['Passed', 'Failed', 'Skipped'];
  chartData: number[] = [0, 0, 0];
  chartType = 'doughnut';
  colors: Color[] = [
    {
      backgroundColor: [
        '#00af00',
        '#f7464a',
        '#ff9900'
      ]
    }
  ];

  chartOptions: ChartOptions = {
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
  };

  assertionOptions: ChartOptions = {
    legend: {
      display: true,
      position: 'right'
    },
    plugins: {
      title: {
        display: true,
        text: 'Assertions',
        padding: {
          top: 10,
          bottom: 30
        }
      }
    },
  };

  assertionChartData: number[] = [0, 0, 0];
  reportTitle = '';

  constructor(public confPost: APIService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.setContent();
    if (this.testCases && this.testCases.length > 0) {
      this.getTestCaseData(this.testCases[0]['id']);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setContent();
  }

  setContent() {
    this.totalTests = this.buildData['tests'];
    this.totalPassedTests = this.buildData['passed'];
    this.totalFailedTests = this.buildData['failed'];
    this.totalSkippedTests = this.buildData['skipped'];
    this.currentTestCase = '';
    this.currentFailedTestCase = '';
    this.totalFailedAssertions = 0;
    this.totalAssertions = 0;
    this.totalPassedAssertions = 0;

    this.failedTestCases = [];
    this.testCases = [];

    if (this.testCasesData) {

      this.setTestCaseFilter();

      this.totalTests = this.buildData['tests'];
      this.totalPassedTests = this.buildData['passed'];
      this.totalFailedTests = this.buildData['failed'];
      this.totalSkippedTests = this.buildData['skipped'];

      this.chartData = [this.totalPassedTests, this.totalFailedTests, this.totalSkippedTests];
      this.assertionChartData = [this.totalPassedAssertions, this.totalFailedAssertions, this.totalSkippedAssertions];
    }
    if (this.totalTests === 0) {
      this.noTestFlag = true;
    }
  }

  sideNavButtonClick(item) {
    switch (item.function) {
      case 'showDashboard()' :
        this.showDashboard();
        break;
      case 'showFailures()' :
        this.showFailures();
        break;
      case 'showTestcases()' :
        this.showTestcases();
        break;
    }
  }



  showDashboard() {
    this.showDashboardData = true;
    this.showFailureData = false;
    this.showTestacasesData = false;
  }

  showFailures() {
    this.showDashboardData = false;
    this.showFailureData = true;
    this.showTestacasesData = false;
  }

  showTestcases() {
    this.showDashboardData = false;
    this.showFailureData = false;
    this.showTestacasesData = true;
  }

  setCurrentTestCase(index) {
    this.currentActiveIndex = index;
    this.currentTestCase = this.testCases[index];
    this.getTestCaseData(this.testCases[index]['id']);
  }


  getTestCaseData(testId) {
    this.currentTestCaseDataLoading = true;
    this.confPost.getAutomationBuildResults('id=' + testId).subscribe(response => {
      let data: any;
      data = response;

      if (data.length === 1) {
        this.currentTestCaseData = data[0];
        this.currentTestCaseDataLoading = false;
      } else {
        this.currentTestCaseDataLoading = false;
        this.currentActiveIndex = -1;
      }

    }, error => {
      this.currentTestCaseDataLoading = false;
      this.currentActiveIndex = -1;
    });
  }

  openBase64Img(base64_string) {
    const dialogRef = this.dialog.open(ImageViewerComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        base64_string: base64_string
      }
    });
  }

  setTestCaseFilter() {

    this.noTestFlag = false;
    this.testCases = [];
    if (this.testCasesData) {
      let testCount = 0;
      for (const testCase of this.testCasesData) {
        if (testCase['status'] === 'success' && this.testCaseFilter.includes('success')) {
          this.testCases.push(testCase);
          testCount++;
        }
        if (testCase['status'] === 'failed' && this.testCaseFilter.includes('failed')) {
          this.testCases.push(testCase);
          testCount++;
        }
        if (testCase['status'] === 'skipped' && this.testCaseFilter.includes('skipped')) {
          this.testCases.push(testCase);
          testCount++;
        }
      }
      if (testCount === 0) {
        this.noTestFlag = true;
      }
    }
  }

  setCurrentFailedTestCase(testCase) {
    this.currentFailedTestCase = testCase.class;
  }

  getDate1(val) {
    if (val) {
      return this.timeConverter(val);
    }
    return '';
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

  timeConverter(ts) {
    let str = '';
    const date_ob = new Date(ts);
    const year = date_ob.getFullYear();
    const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
    const date = ('0' + date_ob.getDate()).slice(-2);
    const hours = ('0' + date_ob.getHours()).slice(-2);
    const minutes = ('0' + date_ob.getMinutes()).slice(-2);
    const seconds = ('0' + date_ob.getSeconds()).slice(-2);
    str = str + date + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    return str;
  }

  getTime(val) {
    if (val) {
      const date_ob = new Date(val);
      let hours = date_ob.getHours();
      const minutes = ('0' + date_ob.getMinutes()).slice(-2);
      const seconds = ('0' + date_ob.getSeconds()).slice(-2);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;

      return hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    }
    return '';
  }

  getStatusCodeClass(val) {
    if (200 <= val && val < 300) {
      return 'success';
    } else if (300 <= val && val < 400) {
      return 'redirects';
    } else if (400 <= val && val < 500) {
      return 'dependencyError';
    } else if (val > 500) {
      return 'serverError';
    }
  }

  getSelectedFilter(val) {
    if (val === 'pass') {
      return (this.testCaseFilter.includes('success') && this.testCaseFilter.length === 1) ? 'filter-selected' : '';
    } else if (val === 'fail') {
      return (this.testCaseFilter.includes('failed') && this.testCaseFilter.length === 1) ? 'filter-selected' : '';
    } else if (val === 'skip') {
      return (this.testCaseFilter.includes('skipped') && this.testCaseFilter.length === 1) ? 'filter-selected' : '';
    } else if (val === 'clear') {
      return (this.testCaseFilter.length === 3) ? 'filter-selected' : '';
    }
  }

  getStatusName(val) {
    if (val === 'success') {
      return 'Pass';
    } else if (val === 'failed') {
      return 'Fail';
    } else if (val === 'info') {
      return 'Info';
    } else {
      return 'Skip';
    }
  }

  getPassRate() {
    return Math.floor(this.buildData['passed'] / this.buildData['tests'] * 100);
  }

  public chartClicked(e) {
    // console.log(e);
  }

  public chartHovered(e) {
    // console.log(e);
  }
}
