import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {StateService} from '../services/state.service';
import {CrudSchtroumpf} from '../services/crud-schtroumpf';
import {Router} from '@angular/router';
import {User} from '../models/User.model';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-friend-view',
  templateUrl: './friend-view.component.html',
  styleUrls: ['./friend-view.component.css']
})
export class FriendViewComponent implements OnInit, OnDestroy {

  public friend: User[] = [];
  public loading: boolean;
  public userId: string;
  private friendSub: Subscription;

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
    this.crudSchtroumpf.getFriend();
  }

  onFriendClicked(id: string): void {
    // this.router.navigate(['/friend/' + id]);
  }

  ngOnDestroy(): void {
    this.friendSub.unsubscribe();
  }

}
