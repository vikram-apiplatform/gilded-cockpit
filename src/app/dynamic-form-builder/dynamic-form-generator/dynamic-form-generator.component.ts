import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dynamic-form-generator',
  templateUrl: './dynamic-form-generator.component.html',
  styleUrls: ['./dynamic-form-generator.component.scss']
})
export class DynamicFormGeneratorComponent implements OnInit {

  @Input() attributeData = [];

  constructor() { }

  ngOnInit() {
  }

}
