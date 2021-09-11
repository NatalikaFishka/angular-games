import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-countries-game',
  templateUrl: './find-countries-game.component.html',
  styleUrls: ['./find-countries-game.component.scss']
})
export class FindCountriesGameComponent implements OnInit {

  isScreenWide!: boolean;

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
