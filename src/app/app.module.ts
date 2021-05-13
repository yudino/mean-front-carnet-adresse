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
import { MyFriendsComponent } from './my-friends/my-friends.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileModifyComponent } from './profile-modify/profile-modify.component';
import {AuthInterceptor} from './interceptors/auth-interceptor';
import { AddfriendComponent } from './addfriend/addfriend.component';


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FriendViewComponent,
    SignupComponent,
    LoginComponent,
    MyFriendsComponent,
    ProfileDetailComponent,
    ProfileModifyComponent,
    AddfriendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
