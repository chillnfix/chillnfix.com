import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { SocialButton } from 'src/app/enums/social-button.enum';

@Component({
  selector: 'app-social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialButtonsComponent implements OnInit {
  @Output() socialClick = new EventEmitter<SocialButton>();
  socialButton = SocialButton;
  constructor() { }

  ngOnInit() {
  }

  onSocialClick(account: SocialButton) {
    this.socialClick.emit(account);
  }
}
