import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/User.model';

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
  createUser(user: User, image: File) {
    return new Promise((resolve, reject) => {
      const userData = new FormData();
      userData.append('user', JSON.stringify(user));
      userData.append('image', image, user.race);
      this.http.post('http://localhost:8080/api/auth/signup', userData).subscribe(
        (response) => {
          resolve(response);
        },
          (error) => {
            reject(error);
          }
        );
    });
  }
  createUserAndAddFriend(user: User, image: File, userId: string) {
    return new Promise((resolve, reject) => {
      const userData = new FormData();
      userData.append('user', JSON.stringify(user));
      userData.append('image', image, user.race);
      userData.append('userId', userId);
      this.http.post('http://localhost:8080/api/auth/create-user-and-friend', userData).subscribe(
        (response) => {
          resolve(response);
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
