import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindCountriesGameComponent } from './find-countries-game.component';
import { FindCountriesResultComponent } from './components/find-countries-results/find-countries-results.component';
import { FindCountriesSettingsComponent } from './components/find-countries-settings/find-countries-settings.component';
import { MapBoardComponent } from './components/map-board/map-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FindCountriesSnackBarComponent } from './components/find-countries-snack-bar/find-countries-snack-bar.component';



@NgModule({
  declarations: [
    FindCountriesGameComponent,
    MapBoardComponent,
    FindCountriesResultComponent,
    FindCountriesSettingsComponent,
    FindCountriesSnackBarComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ]
})
export class FindCountriesGameModule { }
