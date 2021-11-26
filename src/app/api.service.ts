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

    constructor(private _http: HttpClient) {
    }

    getKYCDetails(params = '') {
        return this._http.get(environment.apiHost + '/v1/kyc' + params, this.httpOptions).pipe(map(res => res));
    }

    getData(url) {
        return this._http.get(url, this.httpOptions).pipe(map(res => res));
    }

    getKycHistory(params = '') {
        return this._http.get(environment.apiHost + '/v1/kycHistory' + params, this.httpOptions).pipe(map(res => res));
    }
}
