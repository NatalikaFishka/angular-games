import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { PuzzleConfig } from '../../configs/puzzle-image.config';
import { COMPLEXITY, ComplexityReadable } from '../../models/game-complexity.enum';
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
  public puzzleComplexity: string[] = Object.values(ComplexityReadable);
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
    console.log(this.puzzleComplexity)
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

    
    let selectedComplexity: number = Number(Object.keys(ComplexityReadable).find(key => ComplexityReadable[key] === this.form.value.puzzleComplexity));
    
    let gameConfig: PuzzleGameSettings = {
      isGameStarted: this.isGameStarted,
      puzzleImage: this.form.value.puzzleImage,
      puzzleComplexity: selectedComplexity
    };     

    this.gameSettingsChange.emit(gameConfig);

  }
}
