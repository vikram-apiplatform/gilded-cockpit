import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {

  orders: any;
  error = false;
  constructor(private service: ServiceService) { }

  ngOnInit() {

    this.service.getOrders().subscribe(response => {
      this.orders = response;
    }, error => {
      this.error = true;
    });
  }

}
