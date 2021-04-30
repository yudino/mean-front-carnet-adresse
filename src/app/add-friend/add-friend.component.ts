import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StateService} from '../services/state.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {CrudSchtroumpf} from '../services/crud-schtroumpf';
import {mimeType} from '../services/mime-type.validator';
import {Schtroumpf} from '../models/Schtroumpf.model';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {

  public friendForm: FormGroup;
  public loading = false;
  public imagePreview: string;
  public errorMessage: string;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private crudSchtroumpf: CrudSchtroumpf,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.state.mode$.next('form');
    this.friendForm = this.formBuilder.group({
      famille: [null, Validators.required],
      race: [null, Validators.required],
      nourriture: [null, Validators.required],
      age: [0, Validators.required],
      image: [null, Validators.required, mimeType]
    });
  }

  onSubmit(): void {
    this.loading = true;
    const schtroumpf = new Schtroumpf();
    schtroumpf.famille = this.friendForm.get('famille').value;
    schtroumpf.race = this.friendForm.get('race').value;
    schtroumpf.nourriture = this.friendForm.get('nourriture').value;
    schtroumpf.age = this.friendForm.get('age').value;
    schtroumpf.imageUrl = '';
    this.crudSchtroumpf.createNewFriendWithFile(schtroumpf, this.friendForm.get('image').value).then(
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
