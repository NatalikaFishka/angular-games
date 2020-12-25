import { Component, OnInit } from '@angular/core';
import { Game, GamesConfig } from './config';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public gamesConfig: Game[] = GamesConfig;

  constructor() { }

  ngOnInit(): void {
  }

}
