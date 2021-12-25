import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as paperCore from "paper/dist/paper-core";
import { Raster, View, view, Point } from "paper/dist/paper-core";
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
        paperCore.setup(this.canvasElement.nativeElement);

        this.tileService.createTiles(5,5,1, 100);
    
    }
}