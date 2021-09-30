import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable } from '@angular/core';
import { ComponentRefDirective } from '../../shared/directives/reference.directive';
import { CardComponent } from '../components/card/card.component';
import { CardImageData, GameSettings } from '../models';
import { CardConfigGeneratorService } from './card-config-generator.service';
import { GameResultService } from './game-result.service';

@Injectable({
  providedIn: 'root'
})
export class CardCreatorService {

  private cardFactory: ComponentFactory<CardComponent>;
  private cardComponent!: ComponentRef<CardComponent>;
  private cardContainerRef!: ComponentRefDirective;

  constructor(
    private cardResolver: ComponentFactoryResolver,
    private cardConfigGeneratorService: CardConfigGeneratorService,
    private gameResultService: GameResultService
  ) {
    this.cardFactory = this.cardResolver.resolveComponentFactory(CardComponent);
  }

  createCards(cardContainerRef: ComponentRefDirective): void {
    this.cardContainerRef = cardContainerRef;
    const cardConfig: CardImageData[] = this.cardConfigGeneratorService.generateFinalConfig();
    
    const cardContainerSide: number = this.cardContainerRef.containerRef.element.nativeElement.parentElement.clientWidth;
    const cardSideInPx: number = Math.trunc(cardContainerSide / Math.ceil(Math.sqrt(cardConfig.length )));
    const cardSide: string = `calc(${cardSideInPx}px - 1vw)`;
        
    cardConfig.forEach((cardData) => {
      
      this.cardComponent = cardContainerRef.containerRef.createComponent(this.cardFactory);
      this.cardComponent.instance.cardData = cardData; 
      this.cardComponent.instance.cardSide = cardSide; 
      this.cardComponent.instance.selfViewRef = this.cardComponent.hostView;
      
      this.gameResultService.addGameCardComponent(this.cardComponent);
    });
  }
      
  destroyCards() {
    this.cardContainerRef.containerRef.clear();
  }
  
  createNewGame() {
    this.destroyCards();
    this.gameResultService.resetGame();    
    this.createCards(this.cardContainerRef);
  }

}
