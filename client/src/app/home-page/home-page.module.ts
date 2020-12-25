import { NgModule } from "@angular/core";
import { HomePageComponent } from './home-page.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        HomePageComponent
    ],
    imports: [
        MatButtonModule,
        RouterModule,
        CommonModule,
        MatCardModule
    ]
})
export class HomePageModule {}