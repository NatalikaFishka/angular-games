import { Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserData } from '../models';
import { login, registration } from '../store/actions/auth.actions';
import { AuthUserState } from '../store/reducer/auth.reducer';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent {
  public form: FormGroup;
  private email: string = '';
  private password: string = '';
  private isNewAccount: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authStore: Store<AuthUserState>
    ) {
    this.form = this.fb.group({
      email: [this.email],
      password: [this.password],
      isNewAccount: [this.isNewAccount]
    })
  }

  formSubmit(): void {

    const userData: UserData = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    if(this.form.value.isNewAccount) {
      this.authStore.dispatch(registration({payload: userData}));
      } else {
        this.authStore.dispatch(login({payload: userData}));
    }
  }
}
