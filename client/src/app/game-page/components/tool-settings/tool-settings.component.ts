import { Component, OnDestroy } from '@angular/core';
import { DINO_CONFIG, GAME_SETTINGS } from '../../config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CardCreatorService } from '../../services/card-creater.service';
import { GameResultService } from '../../services/game-result.service';

@Component({
  selector: 'app-tool-settings',
  templateUrl: './tool-settings.component.html',
  styleUrls: ['./tool-settings.component.scss']
})
export class ToolSettingsComponent implements OnDestroy{

  cardsInPlay: number = DINO_CONFIG.length;
  initialCardsInPlay: number = GAME_SETTINGS.cardsInGame;
  maxMatchesPerCard: number = 5;
  minMatchesPerCard: number = 2;
  form: FormGroup;

  constructor(
    public cardCreatorService: CardCreatorService,
    public gameResultService: GameResultService,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      cardsInGame: [this.initialCardsInPlay],
      matchesPerCard: [this.minMatchesPerCard]
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
