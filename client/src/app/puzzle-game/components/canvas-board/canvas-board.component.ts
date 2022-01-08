import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from "@angular/core";
import { TileService } from "../../services/tile.service";

@Component({
    selector: "app-canvas-board",
    templateUrl: "./canvas-board.component.html",
    styleUrls: ["./canvas-board.component.scss"]
})
export class CanvasBoardComponent implements OnInit, OnChanges {

    @ViewChild("canvasElement", { static: true }) public canvasElement!: ElementRef<HTMLCanvasElement>;
    @Input() rasterImage!: ElementRef<HTMLImageElement>;

    constructor(
        private tileService: TileService
    ) {}  


    ngOnInit(): void {
        this.tileService.createGame(this.canvasElement.nativeElement, this.rasterImage.nativeElement);  
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log("Changes!!!!!!!!!!!!!!!!!!!", changes);

        if(!changes.rasterImage.firstChange) {
            
            this.tileService.removeGame();
            this.tileService.createGame(this.canvasElement.nativeElement, this.rasterImage.nativeElement);
        }
    }

}