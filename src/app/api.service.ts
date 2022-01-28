import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class APIService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'pkey': '3fdba83a7f2055ea3fe39d9d3d862d7a',
            'apikey': 'IzoIJCYSxrwCnXsVRmTXKpgk3cuEqOtY',
            'Access-Control-Allow-Origin': '*',
            'observe': 'response'
        })
    };

    gildedHttpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'pkey': '3fdba83a7f2055ea3fe39d9d3d862d7a',
            'apikey': 'QHARThOgmAmnCIG2sNbqvnTVob9L1J5Y',
            'Access-Control-Allow-Origin': '*',
            'observe': 'response'
        })
    };

    constructor(private _http: HttpClient) {
    }

    getKYCDetails(params = '') {
        // https://apiplatform-services-dev.gildedco.app/v1/data/dev-gilded/dev-gilded/kycuser
        // return this._http.get(environment.apiHost + '/v1/kyc' + params, this.httpOptions).pipe(map(res => res));
        return this._http.get(environment.gildedHost + '/v1/data/' + environment.partner + '/' + environment.account + '/' + 'user' + params, this.gildedHttpOptions).pipe(map(res => res));
    }

    getData(url) {
        return this._http.get(url, this.gildedHttpOptions).pipe(map(res => res));
    }

    getKycHistory(params = '') {
        // return this._http.get(environment.gildedHost + '/v1/data/' + environment.partner + '/' + environment.account + '/' + 'kycDetails' + params, this.gildedHttpOptions).pipe(map(res => res));
        return this._http.get(environment.gildedHost + '/v1/data/' + environment.partner + '/' + environment.account + '/' + 'gildedKYCDetails' + params, this.gildedHttpOptions).pipe(map(res => res));
    }

    getKycUser(params = '') {
        // return this._http.get(environment.gildedHost + '/v1/data/' + environment.partner + '/' + environment.account + '/' + 'kycDetails' + params, this.gildedHttpOptions).pipe(map(res => res));
        return this._http.get(environment.gildedHost + '/v1/data/' + environment.partner + '/' + environment.account + '/' + 'gildedKYCUser' + params, this.gildedHttpOptions).pipe(map(res => res));
    }

    getKycInfo(params = '') {
        // return this._http.get(environment.gildedHost + '/v1/data/' + environment.partner + '/' + environment.account + '/' + 'kycDetails' + params, this.gildedHttpOptions).pipe(map(res => res));
        return this._http.get(environment.gildedHost + '/v1/data/' + environment.partner + '/' + environment.account + '/' + 'gildedKYCInfo' + params, this.gildedHttpOptions).pipe(map(res => res));
    }

    getKycResponseDetails(params = '') {
        // return this._http.get(environment.gildedHost + '/v1/data/' + environment.partner + '/' + environment.account + '/' + 'kycDetails' + params, this.gildedHttpOptions).pipe(map(res => res));
        return this._http.get(environment.gildedHost + '/v1/data/' + environment.partner + '/' + environment.account + '/' + 'gildedKYCResponseDetails' + params, this.gildedHttpOptions).pipe(map(res => res));
    }

    getKycSuccessCount() {
        return this._http.get(environment.gildedHost + '/' + environment.partner + '/' + environment.account + '/v1/' + 'getKYCSuccessCount', this.gildedHttpOptions).pipe(map(res => res));
    }

    getKycFailedCount() {
        return this._http.get(environment.gildedHost + '/' + environment.partner + '/' + environment.account + '/v1/' + 'getKYCFailureCount', this.gildedHttpOptions).pipe(map(res => res));
    }

    getKycNotAttemptedCount() {
        return this._http.get(environment.gildedHost + '/' + environment.partner + '/' + environment.account + '/v1/' + 'getKYCNotAttemptedCount', this.gildedHttpOptions).pipe(map(res => res));
    }

    getKycAttemptsCount() {
        return this._http.get(environment.gildedHost + '/' + environment.partner + '/' + environment.account + '/v1/' + 'kycAttempts', this.gildedHttpOptions).pipe(map(res => res));
    }

    getAmlStatus() {
        return this._http.get(environment.gildedHost + '/' + environment.partner + '/' + environment.account + '/v1/' + 'getAMLStatus', this.gildedHttpOptions).pipe(map(res => res));
    }

    getAttributeValues(key, type) {
        if (type === 'kyc') {
            return this._http.get(environment.gildedHost + '/' + environment.partner + '/' + environment.account + '/v1/' + 'getAttributeValues?attribute=' + key, this.gildedHttpOptions).pipe(map(res => res));
        } else if (type === 'aml') {
            return this._http.get(environment.gildedHost + '/' + environment.partner + '/' + environment.account + '/v1/' + 'getAttributeValuesForAML?attribute=' + key, this.gildedHttpOptions).pipe(map(res => res));
        }
    }

    getRemediationsData(params) {
        return this._http.get(environment.apiHost + '/v1/remediations' + params, this.httpOptions).pipe(map(res => res));
    }

    postRemediationsData(payload) {
        return this._http.post(environment.apiHost + '/v1/remediations', payload, this.httpOptions).pipe(map(res => res));
    }

    getAMLDetails(params = '') {
        return this._http.get(environment.apiHost + '/v3/aml' + params, this.httpOptions).pipe(map(res => res));
    }

    getAutomationResults(query) {

        let apiURL = 'https://dev-gilded.gateway.apiplatform.io/v1/automationBuilds';
        apiURL = environment.gildedHost + '/v1/data/' + environment.partner + '/' + environment.account + '/' + 'automationBuilds';
        if (query) {
            apiURL = apiURL + '?' + query;
        }
        return this._http.get(apiURL, this.httpOptions)
            .pipe(map(res => res));
    }

    getAutomationProjects(query) {

        let apiURL = 'https://dev-gilded.gateway.apiplatform.io/v1/automationProjects';
        apiURL = environment.gildedHost + '/v1/data/' + environment.partner + '/' + environment.account + '/' + 'automationProjects';
        if (query) {
            apiURL = apiURL + '?' + query;
        }
        return this._http.get(apiURL, this.httpOptions)
            .pipe(map(res => res));
    }

    getAutomationBuildResults(query) {

        let apiURL = 'https://gateway-dev.gildedco.app/v1/automationTests';
        apiURL = environment.gildedHost + '/v1/data/' + environment.partner + '/' + environment.account + '/' + 'automationTests';
        if (query) {
            apiURL = apiURL + '?' + query;
        }
        return this._http.get(apiURL, this.httpOptions)
            .pipe(map(res => res));
    }

    getAMBADData() {
        return this._http.get(environment.gildedHost + '/' + environment.partner + '/' + environment.account + '/v1/' + 'testAMBAD', this.gildedHttpOptions).pipe(map(res => res));
    }

    postFilteredAMBADData(payload) {
        return this._http.post(environment.apiHost + '/v1/filteredAMBAD/bulkinsert', payload, this.httpOptions).pipe(map(res => res));
    }

}
