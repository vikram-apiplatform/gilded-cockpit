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
  requiredFieldsFlag = true;
  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.service.getOrderForm().subscribe(response => {
      const resp = response;
      if (resp[0]['formAttributes']) {
        this.formAttributes = resp[0]['formAttributes']

        for (const attribute of this.formAttributes) {
          if (attribute.type === 'text_field') {
            attribute['value'] = '';
          } else if (attribute.type === 'selectable_field') {
            attribute['value'] = attribute.options[0];
          }
        }
      }
    }, error => {

    });


  }

  placeOrder() {
    this.requiredFieldsFlag = false;
    for (const attribute of this.formAttributes) {
      if (attribute.required) {
        if (!(attribute.value && attribute.value !== '')) {
          this.requiredFieldsFlag = true;
        }
      }
    }

    if (this.requiredFieldsFlag) {
      console.log('required field not found');
    } else {
      const payload = {}
      for (const attribute of this.formAttributes) {
        payload[attribute.attributeName] = attribute.value;
      }
      this.formSubmitting = true;
      this.service.placeOrder(payload).subscribe(response => {
        const resp = response;
        this.formSubmitting = false;
        console.log('order placed.')
      }, error => {
        this.formSubmitting = false;
      });
    }
  }

}
