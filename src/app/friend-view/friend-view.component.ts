import {Component, OnDestroy, OnInit} from '@angular/core';
import {Schtroumpf} from '../models/Schtroumpf.model';
import {Subscription} from 'rxjs';
import {StateService} from '../services/state.service';
import {CrudSchtroumpf} from '../services/crud-schtroumpf';
import {Router} from '@angular/router';

@Component({
  selector: 'app-friend-view',
  templateUrl: './friend-view.component.html',
  styleUrls: ['./friend-view.component.css']
})
export class FriendViewComponent implements OnInit, OnDestroy {

  public friend: Schtroumpf[] = [];
  public loading: boolean;

  private friendSub: Subscription;

  constructor(private state: StateService,
              private crudSchtroumpf: CrudSchtroumpf,
              private router: Router) { }


  ngOnInit(): void {
    this.loading = true;
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
    this.router.navigate(['/modify-friend/' + id]);
  }

  ngOnDestroy(): void {
    this.friendSub.unsubscribe();
  }

}
