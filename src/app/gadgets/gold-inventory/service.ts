import {Injectable} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class GoldService {

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

    getGoldBarsData() {
        // return this._http.get('/assets/api/cpu-model.json')
        //     .pipe(
        //         catchError(RuntimeService.handleError)
        //     );

        return this._http.get('https://dev-gilded.gateway.apiplatform.io/v1/bar', this.httpOptions).pipe(map(res => res));

    }

    getGoldBarsDataWithParams(params) {
        return this._http.get('https://dev-gilded.gateway.apiplatform.io/v1/bar?' + params, this.httpOptions).pipe(map(res => res));
    }

    getGoldBarsLocations() {
        return this._http.get('https://dev-gilded.gateway.apiplatform.io/v1/BarLocations', this.httpOptions).pipe(map(res => res));
    }

    getGoldBarsRefineries() {
         return this._http.get('https://dev-gilded.gateway.apiplatform.io/v1/barRefineries', this.httpOptions).pipe(map(res => res));
    }
}
