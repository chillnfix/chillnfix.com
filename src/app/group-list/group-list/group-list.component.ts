import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CreateGroupDialogComponent } from '../create-group-dialog/create-group-dialog.component';
import { map, concatMap, concat, mergeMap } from 'rxjs/operators';
import { GroupService } from 'src/app/services/group/group.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectUser } from 'src/app/store/reducers/user/user.reducer';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  user?: User;
  user$: Observable<User>;
  items$: Observable<any> = of([]);
  userDoc?: AngularFirestoreDocument;

  constructor(private db: AngularFirestore,
    private store: Store<any>,
    private dialog: MatDialog, private router: Router, private groupService: GroupService) {
    this.user$ = this.store.pipe(select(selectUser));

    this.user$.pipe(
      map(user => {
        if (!user) {
          throw new Error('not authenticated');
        }
        this.user = user;
        this.userDoc = this.db.doc(`/users/${user.uid}`);
        this.items$ = this.getItems();
      })
    ).subscribe();
  }

  ngOnInit() {
  }

  private getItems() {
    if (!this.userDoc) { return of([]); }
    return this.userDoc.collection('/groups').snapshotChanges().pipe(
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
