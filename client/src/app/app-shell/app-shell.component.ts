import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {

  constructor(
    private dialog: MatDialog, 
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.setUserFromLocalStorage();
  }  

  openDialog(): void {
    this.dialog.open(AuthDialogComponent);
  }
  
}
