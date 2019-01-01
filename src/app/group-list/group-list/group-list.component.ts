import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CreateGroupDialogComponent } from '../create-group-dialog/create-group-dialog.component';
import { map } from 'rxjs/operators';
import { User } from 'firebase';
import { GroupService } from 'src/app/services/group/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  user: User | null;
  items: Observable<any> = of([]);
  userDoc: AngularFirestoreDocument;

  constructor(private db: AngularFirestore, private authService: AuthService,
    private dialog: MatDialog, private router: Router, private groupService: GroupService) {
    this.user = this.authService.getUser();
    this.userDoc = this.db.doc(`/users/${this.user ? this.user.uid : ''}`);
    this.items = this.userDoc.collection('/groups').snapshotChanges().pipe(
      map(actions => {
        return actions.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          };
        });
      })
    );
  }

  ngOnInit() {
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(async name => {
      if (!name || !this.user) { return; }
      this.groupService.createGroup(name, this.user.uid).subscribe((res: any) => {
        console.log('res: ', res);
        this.router.navigate([`/groups/${res.id}/posts`]);
      }, (err => console.error('err: ', err)));
    });
  }
}
