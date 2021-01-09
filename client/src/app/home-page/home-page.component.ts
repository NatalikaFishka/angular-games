import { Component } from '@angular/core';
import { Game, GamesConfig } from './config';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  public gamesConfig: Game[] = [...GamesConfig];
  public gamesImageLoadingStates: boolean[];

  constructor() { 
    this.gamesImageLoadingStates = Array(this.gamesConfig.length).fill(false);
  }

}
