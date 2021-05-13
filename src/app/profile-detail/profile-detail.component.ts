import {Component, OnDestroy, OnInit} from '@angular/core';
import {StateService} from '../services/state.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CrudSchtroumpf} from '../services/crud-schtroumpf';
import {AuthService} from '../services/auth.service';
import {User} from '../models/User.model';

@Component({
  selector: 'app-friend-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {

  public user: User;
  public loading: boolean;
  public userId: string;

  constructor(private state: StateService,
              private router: Router,
              private route: ActivatedRoute,
              private crudSchtroumpf: CrudSchtroumpf,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    this.state.mode$.next('profile-detail');
    this.userId = this.auth.userId;
    this.route.params.subscribe(
      (params: Params) => {
        this.crudSchtroumpf.getProfileById(this.userId).then(
          (user: User) => {
            this.loading = false;
            this.user = user;
          }
        );
      }
    );
  }

  onGoBack(): void {
      this.router.navigate(['/carnet']);
  }

  onModify(id: string): void {
        this.router.navigate(['/modify-profile/' + id]);
  }

  ngOnDestroy(): void {
  }

}
