import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamePageModule } from './game-page/game-page.module';
import { HomePageModule } from './home-page/home-page.module';
import { AppShellModule } from './app-shell/app-shell.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GamePageModule,
    HomePageModule,
    AppShellModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
