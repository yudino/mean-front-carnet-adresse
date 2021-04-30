import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import {Schtroumpf} from '../models/Schtroumpf.model';


@Injectable({
  providedIn: 'root'
})

export class CrudSchtroumpf {

  constructor(private http: HttpClient) { }

  private friend: Schtroumpf[] = [];
  public friend$ = new Subject<Schtroumpf[]>();

  getFriend() {
    this.http.get('http://localhost:8080/api/carnet').subscribe(
      (friend: Schtroumpf[]) => {
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

  getThingById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/stuff/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewFriend(schtroumpf: Schtroumpf) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/carnet', schtroumpf).subscribe(
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
  createNewFriendWithFile(schtroumpf: Schtroumpf, image: File) {
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

  modifyFriend(id: string, friend: Schtroumpf) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:8082/api/carnet/' + id, friend).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyFriendWithFile(id: string, friend: Schtroumpf, image: File | string) {
    return new Promise((resolve, reject) => {
      let friendData: Schtroumpf | FormData;
      if (typeof image === 'string') {
        friend.imageUrl = image;
        friendData = friend;
      } else {
        friendData = new FormData();
        friendData.append('thing', JSON.stringify(friend));
        friendData.append('image', image, friend.race);
      }
      this.http.put('http://localhost:8080/api/carnet/' + id, friendData).subscribe(
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
