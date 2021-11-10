import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

    getKYCDetails() {
        return this._http.get('https://dev-gilded.gateway.apiplatform.io/v1/kyc', this.httpOptions).pipe(map(res => res));
    }
}
