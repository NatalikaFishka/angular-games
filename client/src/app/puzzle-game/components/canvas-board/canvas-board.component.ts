import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { TileService } from "../../services/tile.service";

@Component({
    selector: "app-canvas-board",
    templateUrl: "./canvas-board.component.html",
    styleUrls: ["./canvas-board.component.scss"]
})
export class CanvasBoardComponent implements OnInit {

    @ViewChild("canvasElement", { static: true }) public canvasElement!: ElementRef<HTMLCanvasElement>;
    @Input() rasterImage!: ElementRef<HTMLImageElement>;

    constructor(
        private tileService: TileService
    ) {}
   

    ngOnInit(): void {
        this.tileService.createGame(this.canvasElement.nativeElement, this.rasterImage.nativeElement);    
        console.log(this.rasterImage)
    }
}