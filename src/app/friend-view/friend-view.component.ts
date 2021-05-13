import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {StateService} from '../services/state.service';
import {CrudSchtroumpf} from '../services/crud-schtroumpf';
import {Router} from '@angular/router';
import {User} from '../models/User.model';
import {AuthService} from '../services/auth.service';
import {Friends} from '../models/Friends.model';

@Component({
  selector: 'app-friend-view',
  templateUrl: './friend-view.component.html',
  styleUrls: ['./friend-view.component.css']
})
export class FriendViewComponent implements OnInit, OnDestroy {

  public friend: User[] = [];
  public myFriends: User[] = [];
  public loading: boolean;
  public clicked: boolean;
  public userId: string;
  public addMessage: string;
  public id: string;
  private friendSub: Subscription;
  private myFriendSub: Subscription;

  constructor(private state: StateService,
              private crudSchtroumpf: CrudSchtroumpf,
              private router: Router,
              private auth: AuthService) { }


  ngOnInit(): void {
    this.loading = true;
    this.userId = this.auth.userId;
    this.state.mode$.next('list');
    this.friendSub = this.crudSchtroumpf.friend$.subscribe(
      (friend) => {
        this.friend = friend;
        this.loading = false;
      }
    );
    this.myFriendSub = this.crudSchtroumpf.myFriend$.subscribe(
      (myFriends) => {
        this.myFriends = myFriends;
        this.loading = false;
      }
    );
    this.crudSchtroumpf.getFriend();
    this.crudSchtroumpf.getAllMyFriends(this.userId);
  }

  onFriendClicked(myFriendId: string): void {
    this.crudSchtroumpf.addFriend(myFriendId, this.userId).then(
      () => {
          this.router.navigate(['/my-friend']);
      }
    );
  }

  ngOnDestroy(): void {
    this.friendSub.unsubscribe();
  }

}
