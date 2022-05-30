import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchCardsGameModule } from './match-cards-game/match-cards-game.module';
import { HomePageModule } from './home-page/home-page.module';
import { AppShellModule } from './app-shell/app-shell.module';
import { StoreModule } from '@ngrx/store';
import { GameResultReducer } from './match-cards-game/store/reducers/game-result.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { GameResultEffects } from './match-cards-game/store/effects/game-result.effect';
import { AuthUserReducer } from './app-shell/store/reducer/auth.reducer';
import { AuthUserEffects } from './app-shell/store/effects/auth.effects';
import { FindCountriesGameModule } from './find-countries-game/find-countries-game.module';
import { FindCountriesGameReducer } from './find-countries-game/store/reducer/find-countries-game.reducer';
import { PuzzleGameModule } from './puzzle-game/puzzle-game.module';
import { PuzzleGameReducer } from './puzzle-game/store/reducer/puzzle-game.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatchCardsGameModule,
    FindCountriesGameModule,
    PuzzleGameModule,
    HomePageModule,
    AppShellModule,
    StoreModule.forRoot({
      memoryGameResults: GameResultReducer,
      authUser: AuthUserReducer,
      findCountriesGame: FindCountriesGameReducer,
      puzzleGame: PuzzleGameReducer
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([GameResultEffects, AuthUserEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
