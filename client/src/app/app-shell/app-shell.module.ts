import { NgModule, Provider } from "@angular/core";
import { AppShellComponent } from './app-shell.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClientModule } from "@angular/common/http";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [AppShellComponent, AuthDialogComponent],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        RouterModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTabsModule,
        MatCheckboxModule,
        HttpClientModule,
        MatSnackBarModule
    ],
    exports: [
        AppShellComponent
    ]
})
export class AppShellModule {}