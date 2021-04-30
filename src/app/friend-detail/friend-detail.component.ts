import {Component, OnDestroy, OnInit} from '@angular/core';
import {Schtroumpf} from '../models/Schtroumpf.model';
import {StateService} from '../services/state.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CrudSchtroumpf} from '../services/crud-schtroumpf';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-friend-detail',
  templateUrl: './friend-detail.component.html',
  styleUrls: ['./friend-detail.component.css']
})
export class FriendDetailComponent implements OnInit, OnDestroy {

  public friend: Schtroumpf;
  public loading: boolean;
  public userId: string;

  constructor(private state: StateService,
              private router: Router,
              private route: ActivatedRoute,
              private crudSchtroumpf: CrudSchtroumpf,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    this.state.mode$.next('friend-detail');
    // this.userId = this.auth.userId ? this.auth.userId : 'userID40282382';
    this.route.params.subscribe(
      (params: Params) => {
        this.crudSchtroumpf.getFriendById(params.id).then(
          (friend: Schtroumpf) => {
            this.loading = false;
            this.friend = friend;
          }
        );
      }
    );
  }

  onGoBack(): void {
      this.router.navigate(['/carnet']);
  }

  onModify(id: string): void {
        this.router.navigate(['/modify-friend/' + id]);
  }

  onDelete(id: string): void {
    this.loading = true;
    this.crudSchtroumpf.deleteFriend(id).then(
      () => {
        this.loading = false;
        this.router.navigate(['/carnet']);
      }
    );
  }

  ngOnDestroy(): void {
  }

}
