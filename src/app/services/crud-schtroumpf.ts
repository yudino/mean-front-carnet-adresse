import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import {Friends} from '../models/Friends.model';
import {User} from '../models/User.model';



@Injectable({
  providedIn: 'root'
})

export class CrudSchtroumpf {

  constructor(private http: HttpClient) { }

  private friend: User[] = [];
  private myfriends: User[] = [];
  public friend$ = new Subject<User[]>();
  public myFriend$ = new Subject<User[]>();

  getFriend() {
    this.http.get('http://localhost:8080/api/carnet').subscribe(
      (friend: User[]) => {
        if (friend) {
          this.friend = friend;
          this.emitFriend();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitFriend() {
    this.friend$.next(this.friend);
  }

  getAllMyFriends(userId: string) {
    this.http.get('http://localhost:8080/api/carnet/my-friend/' + userId).subscribe(
      (myfriends: User[]) => {
        if (myfriends) {
          this.myfriends = myfriends;
          this.emitAllMyFriends();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitAllMyFriends() {
    this.myFriend$.next(this.myfriends);
  }

  getProfileById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/api/carnet/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  addFriend(myFriendId: string, userId: string) {
    return new Promise((resolve, reject) => {
      const params = new FormData();
      params.append('userId', JSON.stringify(userId));
      params.append('myFriendId', JSON.stringify(myFriendId));
      const ids = { myFriendId, userId };
      this.http.put('http://localhost:8080/api/carnet/my-friend/', params, {params : ids} ).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              console.log('je suis dans error createFriend');
              reject(error);
            }
          );
    });
  }

  modifyProfileWithFile(id: string, user: User, image: File | string) {
    return new Promise((resolve, reject) => {
      let userData: User | FormData;
      if (typeof image === 'string') {
        user.imageUrl = image;
        userData = user;
      } else {
        userData = new FormData();
        userData.append('thing', JSON.stringify(user));
        userData.append('image', image, user.race);
      }
      this.http.put('http://localhost:8080/api/carnet/' + id, userData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteFriend(myFriendId: string, userId: string) {
    return new Promise((resolve, reject) => {
      const ids = { myFriendId, userId };
      this.http.delete('http://localhost:8080/api/carnet/my-friend/',  {params : ids}).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
