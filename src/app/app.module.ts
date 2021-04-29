import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FriendViewComponent } from './friend-view/friend-view.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { FriendDetailComponent } from './friend-detail/friend-detail.component';
import { FriendModifyComponent } from './friend-modify/friend-modify.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FriendViewComponent,
    SignupComponent,
    LoginComponent,
    AddFriendComponent,
    FriendDetailComponent,
    FriendModifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
