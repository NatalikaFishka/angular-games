import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindCountriesGameComponent } from './find-countries-game.component';
import { FindCountriesResultComponent } from './components/find-countries-results/find-countries-results.component';
import { FindCountriesSettingsComponent } from './components/find-countries-settings/find-countries-settings.component';
import { MapBoardComponent } from './components/map-board/map-board.component';



@NgModule({
  declarations: [
    FindCountriesGameComponent,
    MapBoardComponent,
    FindCountriesResultComponent,
    FindCountriesSettingsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FindCountriesGameModule { }
