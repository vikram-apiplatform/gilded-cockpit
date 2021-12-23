import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor() { }

  downloadFile(data, filename = 'data', headerList) {
    const csvData = this.ConvertToCSV(data, headerList);
    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    const dwldLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  // if Safari open in new window to save file with random filename.
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(itemsArray, headers) {
    let finalOutput = '';
    for (let i = 0 ; i < headers.length ; i++) {
      if (i === 0 ) {
        finalOutput = finalOutput + headers[i];
      } else {
        finalOutput = finalOutput + ',' + headers[i];
      }

    }
    finalOutput = finalOutput + '\n';
    for (let i = 0 ; i < itemsArray.length ; i++){
      for ( let j = 0 ; j < headers.length ; j++){
        let res = JSON.stringify(itemsArray[i][headers[j]]);
        // res = res.replace(',',';');
        res = res.split(',').join(';');
        if (j === 0 ) {
          finalOutput = finalOutput + res;
        } else {
          finalOutput = finalOutput + ',' + res;
        }
      }
      finalOutput = finalOutput + '\n';
    }
    return finalOutput;
  }
}
