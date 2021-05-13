import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {MyFriendsComponent} from './my-friends/my-friends.component';
import {FriendViewComponent} from './friend-view/friend-view.component';
import {ProfileDetailComponent} from './profile-detail/profile-detail.component';
import {ProfileModifyComponent} from './profile-modify/profile-modify.component';
import {AuthGuard} from './services/auth-guard.service';
import {AddfriendComponent} from './addfriend/addfriend.component';

const routes: Routes = [
  { path: 'my-friends', component: MyFriendsComponent, canActivate: [AuthGuard]},
  { path: 'carnet', component: FriendViewComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileDetailComponent, canActivate: [AuthGuard] },
  { path: 'modify-profile/:id', component: ProfileModifyComponent, canActivate: [AuthGuard] },
  { path: 'add-friend', component: AddfriendComponent, canActivate: [AuthGuard] },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: '**', redirectTo: 'carnet' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
