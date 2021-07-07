import { Component, OnDestroy, OnInit } from '@angular/core';
import { DINO_CONFIG, GAME_SETTINGS } from '../../config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CardCreatorService } from '../../services/card-creater.service';
import { GameResultService } from '../../services/game-result.service';
import { AppStore } from 'src/app/app-store.model';
import { Store } from '@ngrx/store';
import { setGameSettings } from '../../store/actions/game-result.actions';
import { CardsCategory } from '../../models';

@Component({
  selector: 'app-tool-settings',
  templateUrl: './tool-settings.component.html',
  styleUrls: ['./tool-settings.component.scss']
})
export class ToolSettingsComponent implements OnInit, OnDestroy{

  cardsInPlay: number = DINO_CONFIG.length;
  initialCardsInPlay: number = GAME_SETTINGS.cardsInGame;
  initialCardsCategory: CardsCategory = CardsCategory.DINO;
  maxMatchesPerCard: number = 5;
  minMatchesPerCard: number = 2;
  cardsCategory: Array<CardsCategory> = Object.values(CardsCategory) ;
  form: FormGroup;

  constructor(
    public cardCreatorService: CardCreatorService,
    public gameResultService: GameResultService,
    private fb: FormBuilder,
    private store: Store<AppStore>
  ) { 
    this.form = this.fb.group({
      cardsCategory: [this.initialCardsCategory],
      cardsInGame: [this.initialCardsInPlay],
      matchesPerCard: [this.minMatchesPerCard]
    });
    
  }

  ngOnInit(): void {
    this.store.dispatch(setGameSettings({payload: this.form.value}));
  }
  
  ngOnDestroy(): void {
    this.gameResultService.resetGame();
  }

  formSubmit() {
    this.store.dispatch(setGameSettings({payload: this.form.value}));
    this.cardCreatorService.createNewGame();
  }
}
