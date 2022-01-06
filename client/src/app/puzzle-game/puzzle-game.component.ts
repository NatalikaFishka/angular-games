import { AfterViewInit, ChangeDetectorRef, Component, ElementRef} from "@angular/core";

@Component({
    selector: "app-puzzle-game",
    templateUrl: "./puzzle-game.component.html",
    styleUrls: ["./puzzle-game.component.scss"]
})
export class PuzzleGameComponent implements AfterViewInit {

    public rasterImage!: ElementRef<HTMLImageElement>;
    public imageUrl!: string;

    constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngAfterViewInit(): void {  
        this.changeDetectorRef.detectChanges();
      }
    
}