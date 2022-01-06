import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PuzzleConfig } from '../../configs/puzzle-image.config';
import { PuzzleConfigModel } from '../../models/puzzle-config.mode';

@Component({
  selector: 'app-puzzle-settings',
  templateUrl: './puzzle-settings.component.html',
  styleUrls: ['./puzzle-settings.component.scss']
})
export class PuzzleSettingsComponent implements OnInit, OnDestroy{

  @Output() imageUrlEmitter: EventEmitter<string> = new EventEmitter<string>();

  public form: FormGroup;
  public puzzleImages: PuzzleConfigModel[] = PuzzleConfig;
  public puzzleComplexity: string[] = ["Hard", "Medium", "Easy"]

  constructor(
    private fb: FormBuilder,
  ) { 
    this.form = this.fb.group({
      puzzleImage: [this.puzzleImages[0].name],
      puzzleComplexity: [this.puzzleComplexity[0]],
    });
    
  }

  ngOnInit(): void {
    this.imageUrlEmitter.emit(this.puzzleImages[0].url);
    // this.store.dispatch(setGameSettings({payload: this.form.value}));
  }
  
  ngOnDestroy(): void {
    // this.gameResultService.resetGame();
  }
  
  formSubmit() {
    // this.store.dispatch(setGameSettings({payload: this.form.value}));
    // this.cardCreatorService.createNewGame();
  }
  
  onChange(event: any) {
    if(event.isUserInput) {

      let newImageName = event.source.viewValue;

      let newImageUrl = this.puzzleImages.find(item => item.name === newImageName)?.url;

      this.imageUrlEmitter.emit(this.puzzleImages[0].url);
      console.log(event.source.viewValue)
    }
  }
}
