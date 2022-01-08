import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from "@angular/core";
import { TileService } from "./services/tile.service";

@Component({
    selector: "app-puzzle-game",
    templateUrl: "./puzzle-game.component.html",
    styleUrls: ["./puzzle-game.component.scss"]
})
export class PuzzleGameComponent implements AfterViewInit {

    public imageUrl!: string;

    @ViewChild("canvasElement", { static: true }) public canvasElement!: ElementRef<HTMLCanvasElement>;
    @ViewChild("imageToRaster", { static: true }) public imageToRaster!: ElementRef<HTMLImageElement>;
    @Input() rasterImage!: HTMLImageElement;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private tileService: TileService
    ) {}
    
    ngAfterViewInit(): void {  
        this.changeDetectorRef.detectChanges();
    }    
    
    public onImageUrlChange(event: string): void {
        this.imageUrl = event;

        this.imageToRaster.nativeElement.onload = () => {
            this.tileService.createGame(this.canvasElement.nativeElement,  this.imageToRaster.nativeElement); 
        }
    }
    
}