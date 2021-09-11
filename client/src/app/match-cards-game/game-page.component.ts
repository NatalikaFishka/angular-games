import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameResultService } from './services/game-result.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit{

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