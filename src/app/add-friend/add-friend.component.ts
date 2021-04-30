import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StateService} from '../services/state.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {CrudSchtroumpf} from '../services/crud-schtroumpf';
import {mimeType} from '../services/mime-type.validator';

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
      title: [null, Validators.required],
      description: [null, Validators.required],
      price: [0, Validators.required],
      image: [null, Validators.required, mimeType]
    });
  }

  onSubmit(): void {

  }

  onImagePick(event: Event): void {

  }

}
