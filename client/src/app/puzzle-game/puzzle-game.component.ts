import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { PuzzleConfig } from "./configs/puzzle-image.config";
import { PuzzleGameSettings } from "./models/puzzle-game-settings.config";
import { TileService } from "./services/tile.service";

@Component({
    selector: "app-puzzle-game",
    templateUrl: "./puzzle-game.component.html",
    styleUrls: ["./puzzle-game.component.scss"]
})
export class PuzzleGameComponent implements AfterViewInit, OnInit {
    
    @ViewChild("canvasElement", { static: true }) public canvasElement!: ElementRef<HTMLCanvasElement>;
    @ViewChild("imageToRaster", { static: true }) public imageToRaster!: ElementRef<HTMLImageElement>;

    public imageUrl: string | undefined;
    public isGameOn: boolean = false;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private tileService: TileService
    ) {}
    
    ngAfterViewInit(): void {  
        this.changeDetectorRef.detectChanges();
    }    

    ngOnInit(): void {
        
        this.imageToRaster.nativeElement.onload = () => {

            if(!this.isGameOn) {
                this.drawImage();
            }
        }
    }

    private startGame(complexity: number): void {
        this.tileService.createGame(this.canvasElement.nativeElement,  this.imageToRaster.nativeElement, complexity); 
    }


    private drawImage(): void {   
        
        this.tileService.drawImage(this.canvasElement.nativeElement,  this.imageToRaster.nativeElement)

    }

    public settingsChanged(event: PuzzleGameSettings): void {

        let currentImageUrl = PuzzleConfig.find(item => item.name === event.puzzleImage)?.url;
        this.isGameOn = event.isGameStarted;

        let complexity = 1.5;
        
        if (event.isGameStarted) {
            this.startGame(complexity);
        } else if(currentImageUrl !== this.imageUrl) {
            this.imageUrl = currentImageUrl;
        } else {
            this.drawImage();
        }

    }
    
}