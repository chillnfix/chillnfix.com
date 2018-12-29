import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { SocialButton } from 'src/app/enums/social-button.enum';

@Component({
  selector: 'app-social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialButtonsComponent implements OnInit {
  @Output() onSocialClick = new EventEmitter<SocialButton>();
  socialButton = SocialButton;
  constructor() { }

  ngOnInit() {
  }

  socialClick(account: SocialButton) {
    this.onSocialClick.emit(account)
  }
}
