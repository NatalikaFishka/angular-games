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

    private scrollMargin = 32;
    private scrollVector = new Point(0,0)

    @ViewChild("canvasElement", { static: true }) public canvasElement!: ElementRef<HTMLCanvasElement>;

    constructor(
        private tileService: TileService
    ) {}
   

    ngOnInit(): void {
        paperCore.setup(this.canvasElement.nativeElement);


        let path = new paperCore.Path();
		// Give the stroke a color
		path.strokeColor = 'red' as unknown as paper.Color;
		let start = new paperCore.Point(100, 100);
		// Move to start and draw a line from there
		path.moveTo(start);
		// Note that the plus operator on Point objects does not work
		// in JavaScript. Instead, we need to call the add() function:
		path.lineTo(start.add([200, -50] as unknown as paper.Point));
		// Draw the view now:
		// paperCore.view.draw();

        // let bob = new Raster('https://res.cloudinary.com/dkqohzqus/image/upload/v1610100714/AngularGames/CardMemoryGame/dino2_vnciyg.jpg');
        // bob.position = view.center

    // let tileRatio = 1;
    // let topTab = 1;
    // let rightTab = 0;
    // let leftTab = 1;
    // let bottomTab = -1;
    // let tileWidth = 100;
    
    // let mask = this.tileService.getMask(tileRatio, topTab, rightTab, bottomTab, leftTab, tileWidth)

    // mask.strokeColor = 'red' as unknown as paper.Color;
    // mask.position = view.center;

    
    this.tileService.createTiles(5,5,1, 100);
    
    }

    public onMouseMove(): void {
        this.tileService.onMouseMove();
    }

    public onMouseDown(): void {
        this.tileService.onMouseDown();
    }

    public onMouseUp(): void {
        this.tileService.onMouseUp();
    }

}