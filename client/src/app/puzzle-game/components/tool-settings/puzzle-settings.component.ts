import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { PuzzleConfig } from '../../configs/puzzle-image.config';
import { PuzzleConfigModel } from '../../models/puzzle-config.mode';
import { PuzzleGameSettings } from '../../models/puzzle-game-settings.config';

@Component({
  selector: 'app-puzzle-settings',
  templateUrl: './puzzle-settings.component.html',
  styleUrls: ['./puzzle-settings.component.scss']
})
export class PuzzleSettingsComponent implements OnInit{

  @Output() gameSettingsChange: EventEmitter<PuzzleGameSettings> = new EventEmitter<PuzzleGameSettings>();

  
  public form: FormGroup;
  public puzzleImages: PuzzleConfigModel[] = PuzzleConfig;
  public puzzleComplexity: string[] = ["Hard", "Medium", "Easy"];
  public isGameStarted: boolean = false;

  constructor(
    private fb: FormBuilder,
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
  }
  
  public stopGame(): void {
    this.isGameStarted = false;
    this.setSettings();      
  }
  
  private setSettings(): void {
    
    let gameConfig: PuzzleGameSettings = {
      isGameStarted: this.isGameStarted,
      puzzleImage: this.form.value.puzzleImage,
      puzzleComplexity: this.form.value.puzzleComplexity
    };     

    this.gameSettingsChange.emit(gameConfig);

  }
}
