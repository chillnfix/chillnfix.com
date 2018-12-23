import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPostComponent } from './add-new-post.component';

describe('AddNewPostComponent', () => {
  let component: AddNewPostComponent;
  let fixture: ComponentFixture<AddNewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
