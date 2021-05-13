import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {StateService} from '../services/state.service';
import {mimeType} from '../services/mime-type.validator';
import {User} from '../models/User.model';

@Component({
  selector: 'app-addfriend',
  templateUrl: './addfriend.component.html',
  styleUrls: ['./addfriend.component.css']
})
export class AddfriendComponent implements OnInit {

  public userForm: FormGroup;
  public loading = false;
  public userId: string;
  public errorMessage: string;
  public imagePreview: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              ) { }

  ngOnInit(): void {
    this.userId = this.auth.userId;
    this.userForm = this.formBuilder.group({
      famille: [null, Validators.required],
      race: [null, Validators.required],
      nourriture: [null, Validators.required],
      age: [0, Validators.required],
      image: [null, Validators.required, mimeType],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSubmit(): void {
    this.loading = true;
    const user = new User();
    user.famille = this.userForm.get('famille').value;
    user.race = this.userForm.get('race').value;
    user.nourriture = this.userForm.get('nourriture').value;
    user.age = this.userForm.get('age').value;
    user.imageUrl = '';
    user.email = this.userForm.get('email').value;
    user.password = this.userForm.get('password').value;
    user.friends = [];
    this.auth.createUserAndAddFriend(user, this.userForm.get('image').value, this.userId).then(
      () => {
        this.loading = false;
        this.router.navigate(['/my-friends']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  onImagePick(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
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
