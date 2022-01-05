import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit } from "@angular/core";

@Component({
    selector: "app-puzzle-game",
    templateUrl: "./puzzle-game.component.html",
    styleUrls: ["./puzzle-game.component.scss"]
})
export class PuzzleGameComponent implements AfterViewInit, OnChanges{

    public rasterImage!: ElementRef<HTMLImageElement>;

    constructor( 
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngAfterViewInit(): void {   
        this.changeDetectorRef.detectChanges();
        console.log(this.rasterImage)
    }

    ngOnChanges(): void {
    }
}