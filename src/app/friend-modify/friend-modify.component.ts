import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Schtroumpf} from '../models/Schtroumpf.model';
import {StateService} from '../services/state.service';
import {CrudSchtroumpf} from '../services/crud-schtroumpf';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {mimeType} from '../services/mime-type.validator';

@Component({
  selector: 'app-friend-modify',
  templateUrl: './friend-modify.component.html',
  styleUrls: ['./friend-modify.component.css']
})
export class FriendModifyComponent implements OnInit {

  public friendForm: FormGroup;
  public friend: Schtroumpf;
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
        this.crudSchtroumpf.getFriendById(params.id).then(
          (friend: Schtroumpf) => {
            this.friend = friend;
            this.friendForm = this.formBuilder.group({
              famille: [friend.famille, Validators.required],
              race: [friend.race, Validators.required],
              nourriture: [friend.nourriture, Validators.required],
              age: [friend.age, Validators.required],
              image: [friend.imageUrl, Validators.required, mimeType]
            });
            this.imagePreview = friend.imageUrl;
            this.loading = false;
          }
        );
      }
    );
  }

  onSubmit(): void {
    this.loading = true;
    const friend = new Schtroumpf();
    friend._id = this.friend._id;
    friend.famille = this.friendForm.get('famille').value;
    friend.race = this.friendForm.get('race').value;
    friend.nourriture = this.friendForm.get('nourriture').value;
    friend.age = this.friendForm.get('age').value;
    friend.imageUrl = '';
    friend.userId = this.userId;
    this.crudSchtroumpf.modifyFriendWithFile(this.friend._id, friend, this.friendForm.get('image').value).then(
      () => {
        this.friendForm.reset();
        this.loading = false;
        this.router.navigate(['/carnet']);
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
    this.friendForm.get('image').patchValue(file);
    this.friendForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.friendForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }
}
