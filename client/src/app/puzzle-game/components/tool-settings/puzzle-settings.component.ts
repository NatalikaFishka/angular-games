import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-puzzle-settings',
  templateUrl: './puzzle-settings.component.html',
  styleUrls: ['./puzzle-settings.component.scss']
})
export class PuzzleSettingsComponent implements OnInit, OnDestroy{

  public form: FormGroup;
  public puzzleImages: string[] = ["Name1", "Name2", "Name3"];
  public puzzleComplexity: string[] = ["Hard", "Medium", "Easy"]

  constructor(
    private fb: FormBuilder,
  ) { 
    this.form = this.fb.group({
      puzzleImage: [this.puzzleImages[0]],
      puzzleComplexity: [this.puzzleComplexity[0]],
    });
    
  }

  ngOnInit(): void {
    // this.store.dispatch(setGameSettings({payload: this.form.value}));
  }
  
  ngOnDestroy(): void {
    // this.gameResultService.resetGame();
  }

  formSubmit() {
    // this.store.dispatch(setGameSettings({payload: this.form.value}));
    // this.cardCreatorService.createNewGame();
  }
}
