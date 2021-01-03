import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from '../app-store.model';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent {

  public authenticatedUserEmail$: Observable<string | undefined>;

  constructor(
    private dialog: MatDialog, 
    public authService: AuthService,
    private store: Store<AppStore>
  ) {
    this.authenticatedUserEmail$ = this.store.select(state => state.authUser.email);
  }

  openDialog(): void {
    this.dialog.open(AuthDialogComponent);
  }
  
}
