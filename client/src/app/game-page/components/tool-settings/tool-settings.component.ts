import { Component, OnDestroy } from '@angular/core';
import { DINO_CONFIG, GAME_SETTINGS } from '../../config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CardCreaterService } from '../../services/card-creater.service';
import { GameResultService } from '../../services/game-result.service';

@Component({
  selector: 'app-tool-settings',
  templateUrl: './tool-settings.component.html',
  styleUrls: ['./tool-settings.component.scss']
})
export class ToolSettingsComponent implements OnDestroy{

  cardsInPlay: number = DINO_CONFIG.length;
  initialCardsInPlay: number = GAME_SETTINGS.cardsInGame;
  maxmatchesPerCard: number = 5;
  minmatchesPerCard: number = 2;
  form: FormGroup;

  constructor(
    public cardCreatorService: CardCreaterService,
    public gameResultService: GameResultService,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      cardsInGame: [this.initialCardsInPlay],
      matchesPerCard: [this.minmatchesPerCard]
    })
  }
  ngOnDestroy(): void {
    this.gameResultService.resetGame();
  }

  setCardsInPlay(numberSelected: number) {
    console.log(numberSelected)
  }

  formSubmit() {
    this.cardCreatorService.createNewGame(this.form.value);
  }
}
