import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccountService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {};

  localLogin(email: string, password: string): Promise<any> {
    const body = JSON.stringify({ email, password });
    return this.http
      .post('api/auth/local', body, { headers: this.headers })
      .toPromise()
  }
}

