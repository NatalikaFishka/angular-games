import { Component, ElementRef} from "@angular/core";

@Component({
    selector: "app-puzzle-game",
    templateUrl: "./puzzle-game.component.html",
    styleUrls: ["./puzzle-game.component.scss"]
})
export class PuzzleGameComponent {

    public rasterImage!: ElementRef<HTMLImageElement>;
    
}