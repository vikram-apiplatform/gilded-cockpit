import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  options: any

  constructor(private _http: HttpClient) { }

  getHttp() {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'pkey': '3fdba83a7f2055ea3fe39d9d3d862d7a',
        'apikey': 'IzoIJCYSxrwCnXsVRmTXKpgk3cuEqOtY',
        'Access-Control-Allow-Origin': '*',
        'observe': 'response'
      })
    };
  }

  postOrderForm(formAttributes) {
    this.getHttp();
    const payload = {
      partner: environment.apiHostName,
      account: environment.apiHostName,
      formAttributes: formAttributes
    }
    console.log(payload)
    return this._http.post(environment.apiHost + '/v1/postOrderForm', payload, this.options).pipe(map(res => res));
  }

  getOrderForm() {
    this.getHttp();
    return this._http.get(environment.apiHost + '/v1/formData?formName=orderForm', this.options)
        .pipe(map(res => res));
  }

  placeOrder(formAttributes) {
    this.getHttp();
    const payload = {
      orderDetails: formAttributes
    }
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'pkey': '3fdba83a7f2055ea3fe39d9d3d862d7a',
        'apikey': 'IzoIJCYSxrwCnXsVRmTXKpgk3cuEqOtY',
        'process_id': 'Process_1635486464023',
        'tenant_id': 'dev-gilded-dev-gilded',
        'Access-Control-Allow-Origin': '*',
        'observe': 'response'
      })
    };
    return this._http.post(environment.apiHost + '/v1/startOrderWorkflow', payload, options).pipe(map(res => res));
  }

  getOrders() {
    this.getHttp();
    return this._http.get(environment.apiHost + '/v1/orders', this.options)
        .pipe(map(res => res));
  }
}
