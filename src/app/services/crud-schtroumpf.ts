import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Schtroumpf} from '../models/Schtroumpf.model';

const url = window.location.href;

@Injectable({
  providedIn: 'root'
})

export class CrudSchtroumpf {
    constructor(private http: HttpClient) { }

  getAll(): Observable<Schtroumpf[]> {
    return this.http.get<Schtroumpf[]>(url);
  }

  get(id: any): Observable<Schtroumpf> {
    // @ts-ignore
    return this.http.get(`${url}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(url, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${url}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${url}/${id}`);
  }
}
