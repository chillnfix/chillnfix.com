import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
})
export class AddNewPostComponent implements OnInit {
  public post = '';
  constructor(public dialogRef: MatDialogRef<AddNewPostComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
