import { Injectable } from "@angular/core";
import * as paperCore from "paper/dist/paper-core";
import { Color, Group, Path, Point, Raster, Rectangle, Size } from "paper/dist/paper-core";
import { Shape } from "./tile-shape.model";

@Injectable({
    providedIn: "root"
})
export class TileService {

    private innerBoard!: paper.PathItem;
    private outerBoard!: paper.PathItem;
    private rasterImage!: HTMLImageElement;
    private idealTileWidth: number = 100;
    private tileWidth: number = this.idealTileWidth;
    private gameRatio: number = 1;

    private getMask(tileRatio: number, topTab: number, rightTab: number, bottomTab: number, leftTab: number): paper.Path {

        let curvyCoords = [
            0, 0, 35, 15, 37, 5,
            37, 5, 40, 0, 38, -5,
            38, -5, 20, -20, 50, -20,
            50, -20, 80, -20, 62, -5,
            62, -5, 60, 0, 63, 5,
            63, 5, 65, 15, 100, 0
        ];
    
        let mask = new Path();    
        let topLeftEdge = new Point(0,0);
    
        mask.moveTo(topLeftEdge);
    
        //Top
        for (let i = 0; i < curvyCoords.length / 6; i++) {
            let p1 = topLeftEdge.add(new Point(curvyCoords[i * 6 + 0] * tileRatio,
            topTab * curvyCoords[i * 6 + 1] * tileRatio));
            let p2 = topLeftEdge.add(new Point(curvyCoords[i * 6 + 2] * tileRatio,
            topTab * curvyCoords[i * 6 + 3] * tileRatio));
            let p3 = topLeftEdge.add(new Point(curvyCoords[i * 6 + 4] * tileRatio,
            topTab * curvyCoords[i * 6 + 5] * tileRatio));

            mask.cubicCurveTo(p1, p2, p3);
        }

        // Right    
        let topRightEdge = topLeftEdge.add(new Point(this.idealTileWidth * tileRatio, 0));
        for (let i = 0; i < curvyCoords.length / 6; i++) {
            let p1 = topRightEdge.add(new Point(-rightTab * curvyCoords[i * 6 + 1] * tileRatio,
            curvyCoords[i * 6 + 0] * tileRatio));
            let p2 = topRightEdge.add(new Point(-rightTab * curvyCoords[i * 6 + 3] * tileRatio,
            curvyCoords[i * 6 + 2] * tileRatio));
            let p3 = topRightEdge.add(new Point(-rightTab * curvyCoords[i * 6 + 5] * tileRatio,
            curvyCoords[i * 6 + 4] * tileRatio));
    
            mask.cubicCurveTo(p1, p2, p3);
            
        }
        //Bottom
        let bottomRightEdge = topRightEdge.add(new Point(0, this.idealTileWidth * tileRatio));
        for (let i = 0; i < curvyCoords.length / 6; i++) {
            let p1 = bottomRightEdge.subtract(new Point(curvyCoords[i * 6 + 0] * tileRatio,
            bottomTab * curvyCoords[i * 6 + 1] * tileRatio));
            let p2 = bottomRightEdge.subtract(new Point(curvyCoords[i * 6 + 2] * tileRatio,
            bottomTab * curvyCoords[i * 6 + 3] * tileRatio));
            let p3 = bottomRightEdge.subtract(new Point(curvyCoords[i * 6 + 4] * tileRatio,
            bottomTab * curvyCoords[i * 6 + 5] * tileRatio));
    
            mask.cubicCurveTo(p1, p2, p3);
        }
        //Left
        let bottomLeftEdge = bottomRightEdge.subtract(new Point(this.idealTileWidth * tileRatio, 0));
        for (let i = 0; i < curvyCoords.length / 6; i++) {
            let p1 = bottomLeftEdge.subtract(new Point(-leftTab * curvyCoords[i * 6 + 1] * tileRatio,
            curvyCoords[i * 6 + 0] * tileRatio));
            let p2 = bottomLeftEdge.subtract(new Point(-leftTab * curvyCoords[i * 6 + 3] * tileRatio,
            curvyCoords[i * 6 + 2] * tileRatio));
            let p3 = bottomLeftEdge.subtract(new Point(-leftTab * curvyCoords[i * 6 + 5] * tileRatio,
            curvyCoords[i * 6 + 4] * tileRatio));
    
            mask.cubicCurveTo(p1, p2, p3);
        }

        let diagonal1 = new Path.Line(topLeftEdge, bottomRightEdge);
        let diagonal2 = new Path.Line(topRightEdge, bottomLeftEdge);

        let center = diagonal1.getCrossings(diagonal2);
        
        mask.data.centerDiff = center[0].point.subtract(mask.position); 
    
        return mask;
    }

    public createTiles(xTileCount: number, yTileCount: number, tileRatio: number): paper.Group[] {
        let tiles = new Array();

        let shapeArray = this.getRandomShapes(xTileCount, yTileCount);
        let tileIndexes: number[] = new Array();
        for (let y = 0; y < yTileCount; y++) {
            for (let x = 0; x < xTileCount; x++) {

                let shape = shapeArray[y * xTileCount + x];

                let mask = this.getMask(tileRatio, shape.topTab, shape.rightTab, shape.bottomTab, shape.leftTab);
                mask.opacity = 0.25;

                let border = mask.clone();
                border.strokeColor = new Color(0,0,0);;
                border.strokeWidth = 5;

                let idealSizedTileWidth = this.idealTileWidth * tileRatio;

                
                let img = this.getTileRaster(
                    new Size(idealSizedTileWidth, idealSizedTileWidth), 
                    new Point(idealSizedTileWidth * x, idealSizedTileWidth * y),
                    tileRatio
                );

                let tile = new Group([mask, border, img, border]);
                tile.clipped = true;
                tile.opacity = 1;   
                tile.data = {
                    shape: shape
                }

                tile.onMouseDown = () => {
                    tile.bringToFront();
                    console.log(tile)
                }

                tile.onMouseDrag = (event: any) => {
                    tile.position = tile.position.add(event.delta)
                }

                tile.onMouseUp = (event: any) => {
                    
                    if(event.point.isInside(this.innerBoard.bounds)) {
                        
                        this.releaseTile(tile, event);

                    } else if (tile.intersects(this.innerBoard)) {

                        tile.position = tile.data.originalPosition;

                    } else {
                        tile.data.originalPosition = tile.position;
                        tile.data.cellPosition = undefined;
                    }
                }

                tile.scale(this.gameRatio);
                tile.data.index =(x + 1) * (y + 1);

                tiles.push(tile);
                tileIndexes.push(tileIndexes.length);
            }
        }

        for (let y = 0; y < yTileCount; y++) {
            for (let x = 0; x < xTileCount; x++) {

                let index1 = Math.floor(Math.random() * tileIndexes.length);
                let index2 = tileIndexes[index1];
                let tile = tiles[index2];
                tileIndexes.splice(index1, 1);
                
                let maxFillAreaX = this.innerBoard.bounds.topLeft.x;
                let maxFillAreaY = this.outerBoard.bounds.bottomLeft.y;

                //10 - random standoff from left and right
                let leftStandoff = this.tileWidth / 2 + 10;
                let rightStandoff = this.tileWidth / 2 - 10;


                let randomX = this.randomIntFromInterval(leftStandoff , maxFillAreaX - rightStandoff);
                let randomY = this.randomIntFromInterval(leftStandoff , maxFillAreaY - rightStandoff);

                let position = new Point(randomX, randomY);

                tile.position = position;
                tile.data.originalPosition = position;
                tile.data.cellPosition = undefined;
            }
        }

        console.log(tiles)

        return tiles;
    }

    private getRandomShapes(width: number, height: number): Shape[] {
        let shapeArray = new Array();

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {

                let topTab = undefined;
                let rightTab = undefined;
                let bottomTab = undefined;
                let leftTab = undefined;

                if (y == 0)
                    topTab = 0;

                if (y == height - 1)
                    bottomTab = 0;

                if (x == 0)
                    leftTab = 0;

                if (x == width - 1)
                    rightTab = 0;

                shapeArray.push(
                    ({
                        topTab: topTab,
                        rightTab: rightTab,
                        bottomTab: bottomTab,
                        leftTab: leftTab
                    })
                );
            }
        }

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {

                let shape = shapeArray[y * width + x];
                
                let shapeRight = (x < width - 1) ? 
                    shapeArray[y * width + (x + 1)] : 
                    undefined;
                
                let shapeBottom = (y < height - 1) ? 
                    shapeArray[(y + 1) * width + x] :
                    undefined;

                shape.rightTab = (x < width - 1) ? 
                    this.getRandomTabValue() :
                    shape.rightTab;

                if (shapeRight)
                    shapeRight.leftTab = - shape.rightTab;
                
                shape.bottomTab = (y < height - 1) ? 
                    this.getRandomTabValue() :
                    shape.bottomTab;

                if (shapeBottom)
                    shapeBottom.topTab = - shape.bottomTab;
            }
        }
        
        return shapeArray;
    }

    private getRandomTabValue(): number {
        return Math.pow(-1, Math.floor(Math.random() * 2));
    }

    private releaseTile(tileGroup: paper.Item, event: paper.ToolEvent): void {

        let allItems = paperCore.project.getItems({
            className: "Group"
        }) as paper.Group[];

        let cellPosition = this.getInnerBoardCellAtPoint(event.point);    
            
        let hasConflict = false;

        let alreadyPlacedTile = this.getTileAtCellPosition(cellPosition, allItems);

        hasConflict = !!alreadyPlacedTile;

        let topTile = this.getTileAtCellPosition(cellPosition.add(new Point(0, -1)), allItems);
        let rightTile = this.getTileAtCellPosition(cellPosition.add(new Point(1, 0)), allItems);
        let bottomTile = this.getTileAtCellPosition(cellPosition.add(new Point(0, 1)), allItems);
        let leftTile = this.getTileAtCellPosition(cellPosition.add(new Point(-1, 0)), allItems);

        if (topTile && topTile !== tileGroup) {
            hasConflict = hasConflict || !(topTile.data.shape.bottomTab + tileGroup.data.shape.topTab === 0);
        }

        if (bottomTile && bottomTile !== tileGroup) {
            hasConflict = hasConflict || !(bottomTile.data.shape.topTab + tileGroup.data.shape.bottomTab === 0);
        }

        if (rightTile && rightTile !== tileGroup) {
            hasConflict = hasConflict || !(rightTile.data.shape.leftTab + tileGroup.data.shape.rightTab === 0);
        }

        if (leftTile && leftTile !== tileGroup) {
            hasConflict = hasConflict || !(leftTile.data.shape.rightTab + tileGroup.data.shape.leftTab === 0);
        }

        console.log("hasConflict", hasConflict);

        if (!hasConflict) {
            
            this.placeTileAtCellPosition(tileGroup, event.point);
            this.isGameCompleted();
        
        } else {

            let position = tileGroup.data.originalPosition;

            this.placeTileAtCellPosition(tileGroup, position);
            
        }
        
    }

    private getInnerBoardCellAtPoint(point: paper.Point): paper.Point {
        
        let innerBoardEventPoint = point.subtract(this.innerBoard.bounds.topLeft);
    
       return new Point(
            Math.ceil(innerBoardEventPoint.x / this.tileWidth),
            Math.ceil(innerBoardEventPoint.y / this.tileWidth));
    }

    private getTileAtCellPosition(point: paper.Point, tilesArray: paper.Group[]): paper.Group {

        let tile!: paper.Group;
        
        for (let i = 0; i < tilesArray.length; i++) {
            
            if(tilesArray[i].data.cellPosition) {

                let {x, y} = tilesArray[i].data.cellPosition;
    
                if (x === point.x && y === point.y) {
                    tile = tilesArray[i];
                    break;
                }
            }

        }
        return tile;
    }

    private placeTileAtCellPosition(tile: paper.Item, dropPoint: paper.Point): void {

        
        let innerBoardCellPosition = this.getInnerBoardCellAtPoint(dropPoint);
        
        let tileHalfSize = new Point(this.tileWidth / 2, this.tileWidth / 2);
        let centerDiff = tile.getItem({}).data.centerDiff.multiply(this.gameRatio);

        let innerLocation = innerBoardCellPosition.multiply(this.tileWidth).subtract(tileHalfSize).subtract(centerDiff);

        tile.position = this.innerBoard.bounds.topLeft.add(innerLocation);

        let firstChild = tile.firstChild as paper.Path;
        let getCrossingsCurves = firstChild.getCrossings(this.innerBoard).length;

        console.log(getCrossingsCurves)

        if(getCrossingsCurves < 2) {
            tile.data.cellPosition = innerBoardCellPosition; 
            tile.data.originalPosition = tile.position;
        } else {
            // leave it for troubleshooting
            console.log("Tile INTERSECTS", tile.intersects(this.innerBoard), firstChild.getCrossings(this.innerBoard))
            console.log('Maybe no conflict and it just thinks that tile not inside. Drop Point ', dropPoint, "innerBoardCellPosition ", innerBoardCellPosition, "innerLocation", innerLocation , "position", tile.position)
            tile.position = tile.data.originalPosition;
            tile.data.cellPosition = undefined; 
        }
    }

    private getTileRaster(size: paper.Size, offset: paper.Point, tileRatio: number): paper.Raster {

        let raster = new Raster(this.rasterImage);

        raster.position = new Point(raster.width / 2 - offset.x, raster.height / 2 - offset.y);

        raster.visible = false;

        // +/-20 is a magic number
        let topLeftEdge = new Point(-20 * tileRatio, -20 * tileRatio)
        let newSize = size.multiply(2)

        let clone = raster.getSubRaster(new Rectangle(topLeftEdge.add(offset), newSize));

        return clone;
    }

    
    public drawImage(view: HTMLCanvasElement, rasterImage: HTMLImageElement): void {        

        paperCore.setup(view)

        let drawImage = new Raster(rasterImage);
        
        //find center of 75% canvas' area
        let positionX = paperCore.project.view.bounds.topRight.x * 0.75 / 2;
        let positionY = paperCore.project.view.center.y;

        drawImage.position = new Point(positionX, positionY);
    }

    public createGame(view: HTMLCanvasElement, rasterImage: HTMLImageElement, complexity: number) {
        paperCore.setup(view); 

        // 60% of 75% of canvas board css area
        let allowedFilledWidthForCanvas = paperCore.project.view.bounds.topRight.x * 0.6 * 0.75;
        
            
        this.gameRatio = allowedFilledWidthForCanvas / rasterImage.naturalWidth;
        this.tileWidth = this.idealTileWidth * this.gameRatio * complexity;

        rasterImage.width = rasterImage.naturalWidth * this.gameRatio;
        rasterImage.height = rasterImage.naturalHeight * this.gameRatio;
        
        this.rasterImage = rasterImage;

        let tilesInRaw = Math.floor(rasterImage.width / this.tileWidth);
        let tiledInColumn = Math.floor(rasterImage.height / this.tileWidth);
        
        let rectObj = new Rectangle(0, 0, tilesInRaw * this.tileWidth, tiledInColumn * this.tileWidth);
        this.innerBoard = new Path.Rectangle(rectObj);
        this.innerBoard.strokeColor =  new Color(204, 204, 204);
        this.innerBoard.shadowColor = new Color(0,0,0);
        this.innerBoard.shadowBlur = 10;
        this.innerBoard.fillColor = new Color(255,255,255)

        let canvasArea = paperCore.project.view.bounds;
        this.outerBoard = new Path.Rectangle(canvasArea);

        
        // 40% of 75% of canvas board css area
        let positionX = canvasArea.topRight.x * 0.4 * 0.75 + this.innerBoard.bounds.width / 2;
        let positionY = paperCore.project.view.center.y;

        let positionOfInnerBoard = new Point(positionX, positionY);

        this.innerBoard.position = positionOfInnerBoard;

        this.createTiles(tilesInRaw, tiledInColumn, complexity);
    }

    private randomIntFromInterval(min: number, max: number): number { 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    private isGameCompleted(): boolean {
        let allTiles = paperCore.project.getItems({
            className: "Group"
        }) as paper.Group[];

        let tilesInCells = allTiles.filter(tile => tile.data.cellPosition);

        if(allTiles.length !== tilesInCells.length) {        
            return false;
        }
        
        let result = allTiles.every(tile => tile.data.index === (tile.data.cellPosition.x * tile.data.cellPosition.y));

        return result;
    }
    
}