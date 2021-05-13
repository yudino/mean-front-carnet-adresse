import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StateService} from '../services/state.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {CrudSchtroumpf} from '../services/crud-schtroumpf';
import {mimeType} from '../services/mime-type.validator';
import {Friends} from '../models/Friends.model';
import {User} from '../models/User.model';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-friend',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css']
})
export class MyFriendsComponent implements OnInit {

  public myfriends: User[] = [];
  public loading: boolean;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;
  private friendSub: Subscription;

  constructor(private state: StateService,
              private crudSchtroumpf: CrudSchtroumpf,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userId = this.auth.userId;
    this.state.mode$.next('list');
    this.friendSub = this.crudSchtroumpf.myFriend$.subscribe(
      (myfriends) => {
        this.myfriends = myfriends;
        this.loading = false;
      }
    );
    this.crudSchtroumpf.getAllMyFriends(this.userId);
  }


  onDeleteFriendClicked(myFriendId: string) {
    this.crudSchtroumpf.deleteFriend(myFriendId, this.userId).then(
      () => {
        this.loading = false;
        this.router.navigate(['/my-friend']);
      }
    );
  }
}
