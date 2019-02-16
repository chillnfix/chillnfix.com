import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AddNewPostComponent } from '../add-new-post/add-new-post.component';
import { AddUserToGroupComponent } from '../add-user-to-group/add-user-to-group.component';
import { Location } from '@angular/common';
import { User } from 'firebase';
import { Store, select } from '@ngrx/store';
import { UserState, selectUser } from 'src/app/store/reducers/user/user.reducer';
import { IUser } from 'src/app/models/user.model';

export interface GroupDetail {
  name: string;
  id: string;
}

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {
  user?: IUser;
  posts$: Observable<any> = of([]);
  groupDetailDoc?: AngularFirestoreDocument<GroupDetail>;
  groupDetail?: GroupDetail;

  constructor(private db: AngularFirestore, private authService: AuthService,
    private route: ActivatedRoute, private location: Location,
    private dialog: MatDialog, private store: Store<UserState>) {
    // this.user = this.authService.getUser();
    this.store.pipe(select(selectUser)).subscribe(user => {
      this.user = user;
    });
    const groups = this.db.collection(`/groups`);
    this.route.params.subscribe(params => {
      this.groupDetailDoc = groups.doc<GroupDetail>(`/${params.groupId}`);
      this.groupDetailDoc.snapshotChanges().subscribe(data => {
        this.groupDetail = <GroupDetail>{
          ...data.payload.data(),
          id: data.payload.id
        };
      });
      this.posts$ = this.groupDetailDoc.collection('/posts').snapshotChanges().pipe(
        map(actions => {
          return actions.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            };
          });
        })
      );
    });
  }

  ngOnInit() {
  }

  addNewPost() {
    const dialogRef = this.dialog.open(AddNewPostComponent);
    dialogRef.afterClosed().subscribe(post => {
      const user = this.user;

      if (!post || !this.groupDetailDoc || !user) { return; }
      this.groupDetailDoc.collection('/posts').add({
        post: post,
        postedBy: {
          displayName: user.displayName,
          uid: user.uid
        }
      });
      console.log('new post: ', post);
    });
  }

  addUserByEmail() {
    if (!this.groupDetail || !this.user) { return; }

    const dialogRef = this.dialog.open(AddUserToGroupComponent, {
      width: '250px',
      data: {
        groupId: this.groupDetail.id,
        uid: this.user.uid
      }
    });
    dialogRef.afterClosed().subscribe((isAdded) => {
      console.log('user added: ', isAdded);
    });
  }

  handleBack() {
    this.location.back();
  }
}
