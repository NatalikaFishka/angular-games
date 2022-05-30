import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/app-store.model';
import { PuzzleConfig } from '../../configs/puzzle-image.config';
import { COMPLEXITY, ComplexityReadable } from '../../models/game-complexity.enum';
import { PuzzleConfigModel } from '../../models/puzzle-config.mode';
import { PuzzleGameSettings } from '../../models/puzzle-game-settings.config';
import { gameIsOff, gameIsOn } from '../../store/actions/puzzle-game.actions';

@Component({
  selector: 'app-puzzle-settings',
  templateUrl: './puzzle-settings.component.html',
  styleUrls: ['./puzzle-settings.component.scss']
})
export class PuzzleSettingsComponent implements OnInit{

  @Output() gameSettingsChange: EventEmitter<PuzzleGameSettings> = new EventEmitter<PuzzleGameSettings>();

  
  public form: FormGroup;
  public puzzleImages: PuzzleConfigModel[] = PuzzleConfig;
  public puzzleComplexity: string[] = Object.values(ComplexityReadable);
  public isGameStarted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStore>
  ) { 
    this.form = this.fb.group({
      puzzleImage: [this.puzzleImages[0].name],
      puzzleComplexity: [this.puzzleComplexity[0]],
    });
    
  }

  public ngOnInit(): void {
    this.setSettings();    
  }
  
  public onChange(event: any) {
    if(event.isUserInput) {
      this.form.controls.puzzleImage.setValue(event.source.viewValue);      
      this.setSettings(); 
    }
  }
  
  
  public startGame() {
    this.isGameStarted = true;
    this.setSettings();
    this.store.dispatch(gameIsOn());      
  }
  
  public stopGame(): void {
    this.isGameStarted = false;
    this.setSettings();      
    this.store.dispatch(gameIsOff());      
  }
  
  private setSettings(): void {
    
    let selectedComplexity: number = Number(Object.keys(ComplexityReadable).find(key => ComplexityReadable[key] === this.form.value.puzzleComplexity));
    
    let gameConfig: PuzzleGameSettings = {
      isGameStarted: this.isGameStarted,
      puzzleImage: this.form.value.puzzleImage,
      puzzleComplexity: selectedComplexity
    };     

    this.gameSettingsChange.emit(gameConfig);

  }
}
