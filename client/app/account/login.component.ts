import { Component } from '@angular/core';

class LoginFormModel {
  email: string;
  password: string;
}

@Component({
  selector: 'local-login',
  styleUrls: ['app/account/login.component.css'],
  templateUrl: 'app/account/login.component.html'
})
export class LoginComponent {
  model: LoginFormModel;

  onSubmit(): void {
    console.log(this.model);
  }
}

