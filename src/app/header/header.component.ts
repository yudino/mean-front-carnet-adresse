import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {StateService} from '../services/state.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public mode: string;
  public isAuth: boolean;

  private modeSub: Subscription;
  private isAuthSub: Subscription;

  constructor(private state: StateService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.modeSub = this.state.mode$.subscribe(
      (mode) => {
        this.mode = mode;
      }
    );
    this.isAuthSub = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy(): void {
    this.modeSub.unsubscribe();
    this.isAuthSub.unsubscribe();
  }

}
