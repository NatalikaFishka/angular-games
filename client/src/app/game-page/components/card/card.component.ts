import { Component,  Input, ViewRef } from '@angular/core';
import { CardState, Dino } from '../../models';
import { GameResultService } from '../../services/game-result.service';
import { CardFlipAnimation } from './card.animation';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: CardFlipAnimation
})
export class CardComponent {

  state: CardState = CardState.default;
  isGameOver: boolean = false;
  startFinalAnimation: boolean = false;

  @Input() cardData!: Dino;
  @Input() cardSide!: string;

  @Input() selfViewRef!: ViewRef;

  /**
   * Distance, which card overcomes
   */
  offsetLeft: number;
  offsetTop: number;

  /**
   * Shake angles on card disappear
   */
  angleRight: number;
  angleLeft: number;

  constructor(
    private gameResultService: GameResultService,
    ) {
      this.offsetLeft = Math.floor(Math.random() * 2000 - 1000);
      this.offsetTop = Math.floor(Math.random() * 2000 - 1000);

      this.angleLeft = Math.floor(Math.random() * 20);
      this.angleRight = Math.floor(Math.random() * 20);
    }
  
  flipCard(): void {
    if(this.state === CardState.default) {
      this.state = CardState.flipped;
      this.gameResultService.openCard(this);
    }
  }

  setMatched() {
    this.state = CardState.matched;
  }  

  setDefault(): void {
    this.state = CardState.default;
  }

  gameOverAnimationDone() {
    if(this.isGameOver) {
      this.selfViewRef.destroy();
    }
  }

}
