import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnChanges, SimpleChange, SimpleChanges} from "@angular/core";

@Component({
    selector: "app-puzzle-game",
    templateUrl: "./puzzle-game.component.html",
    styleUrls: ["./puzzle-game.component.scss"]
})
export class PuzzleGameComponent implements AfterViewInit, OnChanges {

    public rasterImage!: ElementRef<HTMLImageElement>;
    public imageUrl!: string;

    constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngAfterViewInit(): void {  
        this.changeDetectorRef.detectChanges();
    }

    ngOnChanges(value: SimpleChanges): void {
        console.log("ITS CHANGEd", value)
    }
    
}