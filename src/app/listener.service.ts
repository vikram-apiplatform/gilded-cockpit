import {EventEmitter, Injectable, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {

  drillDownListener: EventEmitter<any> = new EventEmitter();


  // @Output() saveEntityAndExecutors: EventEmitter<any> = new EventEmitter();
  // private cdSource = new BehaviorSubject<number>(1);


  constructor() { }
}
