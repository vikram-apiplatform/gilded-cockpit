import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  formAttributes: any;
  formSubmitting = false;
  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.service.getOrderForm().subscribe(response => {
      const resp = response;
      if (resp[0]['formAttributes']) {
        this.formAttributes = resp[0]['formAttributes']

      }
    }, error => {

    });
  }

  placeOrder() {

  }

}
