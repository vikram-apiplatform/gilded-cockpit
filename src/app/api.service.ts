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
        return this._http.get(environment.gildedHost + '/v1/data/' + environment.partner + '/' + environment.account + '/' + 'kycDetails' + params, this.gildedHttpOptions).pipe(map(res => res));
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
}
