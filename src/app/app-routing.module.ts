import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {AddFriendComponent} from './add-friend/add-friend.component';
import {FriendViewComponent} from './friend-view/friend-view.component';
import {FriendDetailComponent} from './friend-detail/friend-detail.component';
import {FriendModifyComponent} from './friend-modify/friend-modify.component';
import {AuthGuard} from './services/auth-guard.service';

const routes: Routes = [
  { path: 'add', component: AddFriendComponent, canActivate: [AuthGuard]},
  { path: 'carnet', component: FriendViewComponent, canActivate: [AuthGuard] },
  { path: 'friend/:id', component: FriendDetailComponent, canActivate: [AuthGuard] },
  { path: 'modify-friend/:id', component: FriendModifyComponent, canActivate: [AuthGuard] },
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
