import { Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

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

  private toastConfig: MatSnackBarConfig = {
    duration: 3000,  
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
  }

  constructor(
    private fb: FormBuilder,
    private authServeice: AuthService,
    private toast: MatSnackBar
    ) {
    this.form = this.fb.group({
      email: [this.email],
      password: [this.password],
      isNewAccount: [this.isNewAccount]
    })
  }

  formSubmit(): void {

    const {email, password} = this.form.value;

    if(this.form.value.isNewAccount) {
      this.authServeice.createNewUser({email, password}).subscribe(
        (data) => {
          this.authServeice.setAuthenticatedUser(data);
          this.toast.open(data.message, undefined, this.toastConfig);
        },
        (error) => this.toast.open(error.error.message, undefined, this.toastConfig)
        )
        
      } else {
        this.authServeice.login({email, password}).subscribe(
          (data) => {            
            this.authServeice.setAuthenticatedUser(data);
            this.toast.open(data.message, undefined, this.toastConfig);
          },
          (error) => this.toast.open(error.error.message, undefined, this.toastConfig)
        )
    }
  }
}
