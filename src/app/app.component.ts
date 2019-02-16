import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Store } from '@ngrx/store';

import * as userActions from './store/actions/user/user.actions';

import { AppState } from './store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  themeClass: string;
  constructor(private overlayContainer: OverlayContainer,
    private store: Store<AppState>) {
    this.themeClass = 'light-theme';

    // remove old theme class and add new theme class
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter(item => {
      item.includes('-theme');
    });
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.themeClass);
  }

  ngOnInit() {
    // this.store.select('user');
    // this.store.dispatch(new userActions.GetUser());
  }
}
