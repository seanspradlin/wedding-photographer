import { Component } from '@angular/core';

import { AccountService } from './account.service';

@Component({
  selector: 'local-login',
  styleUrls: ['app/account/login.component.css'],
  templateUrl: 'app/account/login.component.html'
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private accountService: AccountService) {};

  onSubmit(): void {
    this.accountService.localLogin(this.email, this.password)
      .then(() => console.log('success'))
      .catch(() => console.log('failure'));
  }
}

