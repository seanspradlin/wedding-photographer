import { Component } from '@angular/core';

@Component({
  selector: 'local-login',
  styleUrls: ['app/account/login.component.css'],
  templateUrl: 'app/account/login.component.html'
})
export class LoginComponent {
  email: string;
  password: string;

  onSubmit(): void {
    console.log(this.email, this.password);
  }
}

