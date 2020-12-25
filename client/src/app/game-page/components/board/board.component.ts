import { ChangeDetectorRef, OnInit} from '@angular/core';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ComponentRefDirective } from '../../../shared/directives/reference.directive';
import { CardCreaterService } from '../../services/card-creater.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {

  isScreenWide!: boolean;
  @ViewChild(ComponentRefDirective) cardContainerRef!: ComponentRefDirective;
  
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private cardCreatorService: CardCreaterService
  ) {}

  ngOnInit(): void {
    const screenWidth = window.innerWidth;
    const screenHeigh = window.innerHeight;

    if(screenWidth >= screenHeigh) {
      this.isScreenWide = true;
    } else {
      this.isScreenWide = false;    
    }
    
  }

  ngAfterViewInit(): void {  
    this.cardCreatorService.createCards(this.cardContainerRef);    
    this.changeDetectorRef.detectChanges();
  }
    
}
