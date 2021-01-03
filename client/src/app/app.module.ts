import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamePageModule } from './game-page/game-page.module';
import { HomePageModule } from './home-page/home-page.module';
import { AppShellModule } from './app-shell/app-shell.module';
import { StoreModule } from '@ngrx/store';
import { GameResultReducer } from './game-page/store/reducers/game-result.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { GameResultEffects } from './game-page/store/effects/game-result.effect';
import { AuthUserReducer } from './app-shell/store/reducer/auth.reducer';
import { AuthUserEffects } from './app-shell/store/effects/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GamePageModule,
    HomePageModule,
    AppShellModule,
    StoreModule.forRoot({
      memoryGameResults: GameResultReducer,
      authUser: AuthUserReducer
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([GameResultEffects, AuthUserEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
