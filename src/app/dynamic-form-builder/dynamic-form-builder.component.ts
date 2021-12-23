import {Component, Inject, Input, OnInit} from '@angular/core';
import {moveItemInArray, CdkDragDrop} from '@angular/cdk/drag-drop';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppComponent} from '../app.component';
import {LeftpanelComponent} from '../leftpanel/leftpanel.component';

export interface AttributeColumn {
  name: string;
  headerDisplayName: string;
  type: 'input' | 'selector' | 'checkbox' | 'more';
  placeholder?: string;
  selectableOptions?: string[];
  optionsDisplayNames?: string[];
  description?: string;
  disabled: boolean;
  disabledPlaceholder?: string;
  dataTypeFilter?: any;
}

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.scss']
})
export class DynamicFormBuilderComponent implements OnInit {

  form_attributes = [];
  item: any;
  settingsLoading = true;
  @Input() partner = localStorage.getItem('partner');
  @Input() account = localStorage.getItem('account');

  fieldTypes = [
    {field: 'text_field', displayName: 'Text Input'},
    {field: 'selectable_field', displayName: 'Dropdown'},
  ];

  @Input() enableDisplayPolicyField = false;
  @Input() tableDefinition: AttributeColumn[] = [
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
      selectableOptions: ['Integer', 'String'],
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
      dataTypeFilter: []
    }
  ];


  @Input() newAttribute = {
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
    displayPolicy: null,
    required: false,
    subType: [],
    formAttribute: true
  };

  @Input() formAttributes = [
    {
      attributeName: 'Field 1',
      type: 'String',
      fieldType: 'text_field',
      required: true,
      attributeType: 'None'

    },
    {
      attributeName: 'Field 2',
      type: 'String',
      fieldType: 'text_field',
      required: true,
      attributeType: 'None'
    }
  ];

  updating = false;

  constructor(public dialog: MatDialog, private appComp: AppComponent, public platform: LeftpanelComponent) { }

  async ngOnInit() {
    this.settingsLoading = false;
  }

  drop(event: CdkDragDrop<Object[]>) {
    moveItemInArray(this.form_attributes, event.previousIndex, event.currentIndex);
  }

  attributeDrop(event: CdkDragDrop<Object[]>) {
    moveItemInArray(this.formAttributes, event.previousIndex, event.currentIndex);
  }

  dropOption(event: CdkDragDrop<Object[]>, options) {
    moveItemInArray(options, event.previousIndex, event.currentIndex);
  }

  deleteAttribute(index) {
    this.form_attributes.splice(index, 1);
  }

  deleteAttributeField(index) {
    this.formAttributes.splice(index, 1);
  }


  deleteFieldOption(options, i) {
    options.splice(i, 1);
  }

  addFieldOption(options) {
    options.push('Option');
  }

  addFormField() {
    this.form_attributes.push({
      type: 'text_field',
      name: 'Name',
      required: false,
      description: ''
    });
  }

  addAttributeField() {
    this.formAttributes.push(JSON.parse(JSON.stringify(this.newAttribute)));
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  fieldTypeChange(value) {
    if (value.options) {
      delete value['options'];
    }
    if (value.type === 'selectable_field') {
      value['options'] = ['Option 1', 'Option 2', 'Option 3'];
    }
  }

  async openAttributeDescriptionDialog(header, definition) {
    const data = {
      'displayName': definition.displayName,
      'description': definition.description,
      'dataStoragePolicy': definition.dataStoragePolicy,
      'apiAccessPolicy': definition.apiAccessPolicy,
      'displayPolicy': definition.displayPolicy,
      'definitionType': definition.type,
      'datatypeFilter': header.dataTypeFilter,
      'disableDisplayNameField': true,
      'enableDisplayPolicyFieldByDefault': this.enableDisplayPolicyField
    };
    const dialogRef = this.dialog.open(AttributeDescriptionComponent, {
      data: data
    });

    const result = await dialogRef.afterClosed().toPromise();
    definition.description = data.description;
    definition.dataStoragePolicy = data.dataStoragePolicy;
    definition.apiAccessPolicy = data.apiAccessPolicy;
    definition.displayPolicy = data.displayPolicy;

  }
}

@Component({
  selector: 'app-attribute-description-dialog',
  templateUrl: 'attribute-description.component.html',
  styleUrls: ['attribute-description.component.css']
})
export class AttributeDescriptionComponent {

  datastoragepolicy = ['None', 'Encrypted'];
  apiaccesspolicy = ['None', 'Decrypted', 'Encrypted', 'Masked (All with X)', 'Masked (All with x)', 'Masked (All with *)', 'Masked (xxxx-xxxx-xxxx-####)', 'Masked (xxxxxxxxxxxx####)'];
  displaypolicy = ['None', 'Decrypted', 'Encrypted', 'Masked'];

  constructor(
      public platform: LeftpanelComponent,
      public dialogRef: MatDialogRef<AttributeDescriptionComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  isFamilyString(type, datatypeFilter): boolean {
    let matched = false;
    if (datatypeFilter) {
      for (let i = 0; i < datatypeFilter.length; i++) {
        if (datatypeFilter[i]['data_types'][0]['type'] === type) {
          if (datatypeFilter[i]['data_types'][0]['family'] === 'String') {
            matched = true;
            return true;
          }
        }
      }
      if (matched === false) {
        return false;
      }
    }
  }
}
