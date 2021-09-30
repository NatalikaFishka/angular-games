import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchCardsGameComponent } from './match-cards-game/match-cards-game.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FindCountriesGameComponent } from './find-countries-game/find-countries-game.component';

const routes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full'},
  {path: 'match-cards-game', component: MatchCardsGameComponent},
  {path: 'find-countries-game', component: FindCountriesGameComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
