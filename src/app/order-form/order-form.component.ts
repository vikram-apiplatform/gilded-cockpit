import {Component, Input, OnInit} from '@angular/core';
import {ServiceService} from '../service.service';
import {AttributeColumn} from '../dynamic-form-builder/dynamic-form-builder.component';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  tableDefinition: AttributeColumn[] = [
    {
      name: 'displayName',
      headerDisplayName: 'Display Name',
      type: 'input',
      placeholder: 'Display Name',
      description: 'Display Name',
      disabled: false
    },
    {
      name: 'attributeName',
      headerDisplayName: 'Name',
      type: 'input',
      placeholder: 'Attribute Name',
      selectableOptions: [],
      description: 'Name of the Attribute',
      disabled: false
    },
    {
      name: 'type',
      headerDisplayName: 'Data Type',
      type: 'selector',
      selectableOptions: [
        'Integer',
        'Date',
        'Timestamp',
        'Boolean',
        'String',
        'Double'
      ],
      disabled: false,
      disabledPlaceholder: 'Please select a Database'
    },
    {
      name: 'fieldType',
      headerDisplayName: 'Form Field Type',
      type: 'selector',
      selectableOptions: ['text_field'],
      optionsDisplayNames: ['Text Input'],
      disabled: false
    },
    {
      name: 'size',
      headerDisplayName: 'Size',
      type: 'input',
      placeholder: 'Size',
      disabled: false
    },
    {
      name: 'precision',
      headerDisplayName: 'Precision',
      type: 'input',
      placeholder: 'Precision',
      disabled: false
    },
    {
      name: 'attributeType',
      headerDisplayName: 'Key',
      type: 'selector',
      selectableOptions: ['None', 'Primary', 'Unique'],
      disabled: false
    },
    {
      name: 'required',
      headerDisplayName: 'Required',
      type: 'checkbox',
      description: 'Required',
      disabled: false
    },
    {
      name: 'autoIncrement',
      headerDisplayName: 'Auto-Increment',
      type: 'checkbox',
      description: 'Auto-Increment',
      disabled: false
    },
    {
      name: '',
      headerDisplayName: '',
      type: 'more',
      disabled: false,
      dataTypeFilter: [{'data_types':[{'type':'ObjectId','default_length':'','min_length':'','max_length':'','family':'String'}],'database_type':'mongodb','id':9},{'data_types':[{'type':'Integer','default_length':'','min_length':'','max_length':'','family':'Number'}],'database_type':'mongodb','id':2},{'data_types':[{'type':'Date','default_length':'','min_length':'','max_length':'','family':'Date'}],'database_type':'mongodb','id':3},{'data_types':[{'type':'Timestamp','default_length':'','min_length':'','max_length':'','family':'String'}],'database_type':'mongodb','id':5},{'data_types':[{'type':'Boolean','default_length':'','min_length':'','max_length':'','family':'Boolean'}],'database_type':'mongodb','id':6},{'data_types':[{'type':'String','default_length':'','min_length':'','max_length':'','family':'String'}],'database_type':'mongodb','id':1},{'data_types':[{'type':'Object','default_length':'','min_length':'','max_length':'','family':'String'}],'database_type':'mongodb','id':8},{'data_types':[{'type':'Double','default_length':'','min_length':'','max_length':'','family':'Number'}],'database_type':'mongodb','id':4}]
    }
  ];


  newAttribute = {
    fieldType: 'text_field',
    attributeType: 'None',
    customType: false,
    apiAccessPolicy: 'None',
    attributeName: null,
    type: null,
    array: false,
    size: null,
    precision: null,
    autoIncrement: false,
    defaultValue: null,
    dataStoragePolicy: 'None',
    description: null,
    displayName: '',
    displayPolicy: 'None',
    required: false,
    subType: [],
    formAttribute: true
  };

  formAttributes = [];

  formUpdating = false;

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

  updateFormAttributes() {
    this.formUpdating = true;
    this.service.postOrderForm(this.formAttributes).subscribe(response => {
      console.log('success')
      this.formUpdating = false;
    }, error => {
      this.formUpdating = false;
    });
  }

}
