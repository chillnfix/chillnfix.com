import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-add-user-to-group',
  templateUrl: './add-user-to-group.component.html',
})
export class AddUserToGroupComponent implements OnInit {
  email = '';
  constructor(public dialogRef: MatDialogRef<AddUserToGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private groupService: GroupService) { }


  ngOnInit() {
  }

  addUser() {
    console.log(this.email, this.data);
    this.groupService.addUserByEmail(this.email, this.data.uid, this.data.groupId)
      .subscribe(
        () => this.dialogRef.close(true),
        () => this.dialogRef.close());
  }
}
