import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameResultService } from './services/game-result.service';

@Component({
  selector: 'app-match-cards-game',
  templateUrl: './match-cards-game.component.html',
  styleUrls: ['./match-cards-game.component.scss']
})
export class MatchCardsGameComponent implements OnInit{

  isScreenWide!: boolean;

  ngOnInit(): void {
    const screenWidth = window.innerWidth;
    const screenHeigh = window.innerHeight;

    if(screenWidth >= screenHeigh) {
      this.isScreenWide = true;
    } else {
      this.isScreenWide = false;    
    }     
  }
}