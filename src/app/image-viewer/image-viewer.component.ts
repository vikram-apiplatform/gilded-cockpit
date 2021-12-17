import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LeftpanelComponent} from '../leftpanel/leftpanel.component';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ImageViewerComponent>) { }

  ngOnInit() {
    if (!this.data.base64_string || this.data.base64_string === '') {
      this.dialogRef.close();
    }
  }

}
