import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {StateService} from '../../services/state.service';
import {mimeType} from "../../services/mime-type.validator";
import {User} from "../../models/User.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  public loading = false;
  public errorMessage: string;
  public imagePreview: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private state: StateService) { }

  ngOnInit(): void {
    this.state.mode$.next('form');
    this.signupForm = this.formBuilder.group({
      famille: [null, Validators.required],
      race: [null, Validators.required],
      nourriture: [null, Validators.required],
      age: [0, Validators.required],
      image: [null, Validators.required, mimeType],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
   }

  onSignup(): void {
    this.loading = true;
    const user = new User();
    user.famille = this.signupForm.get('famille').value;
    user.race = this.signupForm.get('race').value;
    user.nourriture = this.signupForm.get('nourriture').value;
    user.age = this.signupForm.get('age').value;
    user.imageUrl = '';
    user.email = this.signupForm.get('email').value;
    user.password = this.signupForm.get('password').value;
    this.auth.createUser(user, this.signupForm.get('image').value).then(
      () => {
        this.loading = false;
        this.router.navigate(['/carnet']);
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
    this.signupForm.get('image').patchValue(file);
    this.signupForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.signupForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }
}
