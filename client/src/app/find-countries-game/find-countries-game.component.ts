import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '../app-store.model';
import { cleanStore } from './store/actions/find-countries-game.actions';
@Component({
  selector: 'app-find-countries-game',
  templateUrl: './find-countries-game.component.html',
  styleUrls: ['./find-countries-game.component.scss']
})
export class FindCountriesGameComponent implements OnInit, OnDestroy {

  public showHintTooltip!: boolean;
  public isSmallScreen!: boolean;

  constructor(
    private store: Store<AppStore>
  ) {}

  ngOnInit(): void {
    const screenWidth = window.innerWidth;
    const screenHeigh = window.innerHeight;

    this.isSmallScreen = screenWidth < 900;
  }

  ngOnDestroy(): void {
    this.store.dispatch(cleanStore())
  }

}
