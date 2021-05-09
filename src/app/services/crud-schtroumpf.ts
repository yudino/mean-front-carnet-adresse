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
  public friend$ = new Subject<User[]>();

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

  // tslint:disable-next-line:typedef
  createNewFriendWithFile(schtroumpf: Friends, image: File) {
    return new Promise((resolve, reject) => {
      console.log('appel front');
      const friendData = new FormData();
      friendData.append('schtroumpf', JSON.stringify(schtroumpf));
      friendData.append('image', image, schtroumpf.race);
      this.http.post('http://localhost:8080/api/carnet', friendData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          console.log('je suis dans error front');
          reject(error);
        }
      );
    });
  }

  modifyFriendWithFile(id: string, user: User, image: File | string) {
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

  deleteFriend(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:8080/api/carnet/' + id).subscribe(
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
