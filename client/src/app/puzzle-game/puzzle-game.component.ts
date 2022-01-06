import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from "@angular/core";

@Component({
    selector: "app-puzzle-game",
    templateUrl: "./puzzle-game.component.html",
    styleUrls: ["./puzzle-game.component.scss"]
})
export class PuzzleGameComponent implements AfterViewInit {

    public rasterImage!: HTMLImageElement;
    public imageUrl!: string;
    public finalImageElementRef: boolean = false;

    constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngAfterViewInit(): void {  
        this.changeDetectorRef.detectChanges();
    }    

    public onImageUrlChange(event: string): void {
        this.imageUrl = event;
        this.resetImageReference();
    }
    
    public onImageElementChange(event: HTMLImageElement): void {
        this.rasterImage = event;
    }
    
    private resetImageReference(): void {
        this.finalImageElementRef = false;
        setTimeout(() => {this.finalImageElementRef = true}, 500)
        
    }
    
}