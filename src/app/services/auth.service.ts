import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


// const url = window.location.href;


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  userId: string;

  constructor(private router: Router,
              private http: HttpClient) {}

  // tslint:disable-next-line:typedef
  createUser(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.http.post(
        'http://localhost:8080/api/auth/signup',
        { email, password })
        .subscribe(
          () => {
            this.login(email, password).then(
              () => {
                resolve();
              }
            ).catch(
              (error) => {
                reject(error);
              }
            );
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  // tslint:disable-next-line:typedef
  login(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.http.post(
        'http://localhost:8080/api/auth/login',
        { email, password })
        .subscribe(
          (authData: { token: string, userId: string }) => {
            this.token = authData.token;
            this.userId = authData.userId;
            this.isAuth$.next(true);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null;
  }
}
