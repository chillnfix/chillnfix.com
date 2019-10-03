import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { Observable, of, combineLatest } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CreateGroupDialogComponent } from '../create-group-dialog/create-group-dialog.component';
import { map, concatMap, concat, mergeMap, tap } from 'rxjs/operators';
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
  items: Array<any> = [];
  userDoc?: AngularFirestoreDocument;

  constructor(
    private db: AngularFirestore, private store: Store<any>,
    private dialog: MatDialog, private router: Router, private groupService: GroupService) {
    this.user$ = this.store.pipe(select(selectUser));

    this.user$.pipe(
      map(user => {
        if (!user) {
          throw new Error('not authenticated');
        }
        this.user = user;
        this.userDoc = this.db.doc(`/users/${user.uid}`);
        // get group list
        this.getItems().subscribe(data => {
          if (data) {
            this.getGroupsData(data.groups).subscribe(
              groups => { this.items = groups; console.log(this.items); }
            );
          }
        });
      })
    ).subscribe();
  }

  getGroupsData(userGroups: string[] = []) {
    const groups$: Observable<any>[] = [];
    userGroups.map(groupId => {
      groups$.push(this.db.collection('groups').doc(groupId).snapshotChanges());
    });
    return combineLatest(groups$).pipe(
      map(([...args]) => {
        return args.map(x => {
          return {
            id: x.payload.id,
            ...x.payload.data()
          };
        });
      })
    );
  }

  ngOnInit() {
  }

  private getItems() {
    if (!this.userDoc) { return of([]); }
    return this.userDoc.snapshotChanges().pipe(
      map(item => {
        return item.payload.data();
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
        this.router.navigate([`/groups/${res.id}/posts`]);
      }, (err => console.error('err: ', err)));
    });
  }
}
