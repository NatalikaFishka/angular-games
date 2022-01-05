import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TileService } from "./services/tile.service";

@Component({
    selector: "app-puzzle-game",
    templateUrl: "./puzzle-game.component.html",
    styleUrls: ["./puzzle-game.component.scss"]
})
export class PuzzleGameComponent implements OnInit {

    @ViewChild("canvasElement", { static: true }) public canvasElement!: ElementRef<HTMLCanvasElement>;

    constructor(
        private tileService: TileService
    ) {}
   

    ngOnInit(): void {
        this.tileService.createGame(this.canvasElement.nativeElement);    
    }
}