import { NgModule } from "@angular/core";
import { HomePageComponent } from './home-page.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        HomePageComponent
    ],
    imports: [
        MatButtonModule,
        RouterModule,
        CommonModule,
        MatCardModule,
        MatProgressSpinnerModule
    ]
})
export class HomePageModule {}