import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {AddFriendComponent} from './add-friend/add-friend.component';
import {FriendViewComponent} from './friend-view/friend-view.component';
import {FriendDetailComponent} from './friend-detail/friend-detail.component';
import {FriendModifyComponent} from './friend-modify/friend-modify.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'add', component: AddFriendComponent },
  { path: 'carnet', component: FriendViewComponent },
  { path: 'friend/:id', component: FriendDetailComponent },
  { path: 'modify-friend/:id', component: FriendModifyComponent },
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
