import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from '../app-store.model';
import { ComponentRefDirective } from '../shared/directives/reference.directive';
import { FindCountriesResultService } from './services/find-countries-result.service';

@Component({
  selector: 'app-find-countries-game',
  templateUrl: './find-countries-game.component.html',
  styleUrls: ['./find-countries-game.component.scss']
})
export class FindCountriesGameComponent implements OnInit {

  public isScreenWide!: boolean;
  public isGameOn$: Observable<boolean>;

  constructor(
    private store: Store<AppStore>,
  ) {
    this.isGameOn$ = this.store.select(store => store.findCountriesGame.isGameOn)
  }


  ngOnInit(): void {
    const screenWidth = window.innerWidth;
    const screenHeigh = window.innerHeight;

    if(screenWidth >= screenHeigh) {
      this.isScreenWide = true;
    } else {
      this.isScreenWide = false;    
    }    
    
  }

}
