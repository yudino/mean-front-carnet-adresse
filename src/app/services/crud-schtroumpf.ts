import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Schtroumpf} from '../models/Schtroumpf.model';


@Injectable({
  providedIn: 'root'
})

export class CrudSchtroumpf {
    constructor(private http: HttpClient) { }

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
}
