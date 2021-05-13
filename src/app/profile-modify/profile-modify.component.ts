import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StateService} from '../services/state.service';
import {CrudSchtroumpf} from '../services/crud-schtroumpf';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {mimeType} from '../services/mime-type.validator';
import {User} from '../models/User.model';

@Component({
  selector: 'app-friend-modify',
  templateUrl: './profile-modify.component.html',
  styleUrls: ['./profile-modify.component.css']
})
export class ProfileModifyComponent implements OnInit {

  public userForm: FormGroup;
  public user: User;
  public loading = false;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private crudSchtroumpf: CrudSchtroumpf,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    this.state.mode$.next('form');
    this.userId = this.auth.userId;
    this.route.params.subscribe(
      (params) => {
        this.crudSchtroumpf.getProfileById(this.userId).then(
          (user: User) => {
            this.user = user;
            this.userForm = this.formBuilder.group({
              famille: [user.famille, Validators.required],
              race: [user.race, Validators.required],
              nourriture: [user.nourriture, Validators.required],
              age: [user.age, Validators.required],
              image: [user.imageUrl, Validators.required, mimeType]
            });
            this.imagePreview = user.imageUrl;
            this.loading = false;
          }
        );
      }
    );
  }

  onSubmit(): void {
    this.loading = true;
    const user = new User();
    user._id = this.user._id;
    user.famille = this.userForm.get('famille').value;
    user.race = this.userForm.get('race').value;
    user.nourriture = this.userForm.get('nourriture').value;
    user.age = this.userForm.get('age').value;
    user.imageUrl = '';
 //   friend.userId = this.userId;
    this.crudSchtroumpf.modifyProfileWithFile(this.user._id, user, this.userForm.get('image').value).then(
      () => {
        this.userForm.reset();
        this.loading = false;
        this.router.navigate(['/modify-profile/' + this.userId]);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  onImagePick(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.userForm.get('image').patchValue(file);
    this.userForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.userForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }
}
