import { Injectable } from "@angular/core";
import * as paperCore from "paper/dist/paper-core";
import { Group, PaperScope, Path, Point, project, Raster, Rectangle, Size, view } from "paper/dist/paper-core";

interface shape {
    bottomTab: number;
    leftTab: number;
    rightTab: number;
    topTab: number;
}

@Injectable({
    providedIn: "root"
})
export class TileService {

    private tool: any;

    constructor() {
        this.tool = new paperCore.Tool();
    }

    private getMask(tileRatio: number, topTab: number, rightTab: number, bottomTab: number, leftTab: number, tileWidth: number): paper.Path {

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
        let topRightEdge = topLeftEdge.add(new Point(tileWidth, 0));
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
        let bottomRightEdge = topRightEdge.add(new Point(0, tileWidth));
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
        let bottomLeftEdge = bottomRightEdge.subtract(new Point(tileWidth, 0));
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

        let center = diagonal1.getCrossings(diagonal2   );
        
        mask.data.centerDiff = center[0].point.subtract(mask.position); 
    
        return mask;
    }

    public createTiles(xTileCount: number, yTileCount: number, tileRatio: number, tileWidth: number): paper.Group[] {
        let tiles = new Array();

        let shapeArray = this.getRandomShapes(xTileCount, yTileCount);
        let tileIndexes: number[] = new Array();
        for (let y = 0; y < yTileCount; y++) {
            for (let x = 0; x < xTileCount; x++) {

                let shape = shapeArray[y * xTileCount + x];

                let mask = this.getMask(tileRatio, shape.topTab, shape.rightTab, shape.bottomTab, shape.leftTab, tileWidth);
                mask.opacity = 0.25;
                mask.strokeColor = '#ff0000' as unknown as paper.Color;
                mask.fillColor = "#ff0000" as unknown as paper.Color;

                let border = mask.clone();
                border.strokeColor = 'black' as unknown as paper.Color;
                border.strokeWidth = 5;

                
                let img = this.getTileRaster(
                    new Size(tileWidth, tileWidth), 
                    new Point(tileWidth * x, tileWidth * y)
                );

                let tile = new Group([mask, border, img, border]);
                tile.clipped = true;
                tile.opacity = 1;   
                tile.data = {
                    picked: false,
                    shape: shape
                }
                
                tiles.push(tile);
                tileIndexes.push(tileIndexes.length);
            }
        }

        for (let y = 0; y < yTileCount; y++) {
            for (let x = 0; x < xTileCount; x++) {

                let index1 = Math.floor(Math.random() * tileIndexes.length);
                let index2 = tileIndexes[index1];
                let tile = tiles[index2];
                tileIndexes.splice (index1, 1);

                let position =  new Point(tileWidth, tileWidth).add( 
                                new Point(tileWidth * (x * 2 + (y % 2)), tileWidth  * y));

                this.placeTileAtCellPosition(tile, position, tileWidth);
            }
        }

        return tiles;
    }



    private getRandomShapes(width: number, height: number): shape[] {
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

    public onMouseMove(): void {
        
        this.tool.onMouseMove = (event: paper.ToolEvent) => {

            let pickedItem = paperCore.project.getItem({
                data: {
                    picked: true
                }
            })

            if(pickedItem) {
                    pickedItem.position = pickedItem.position.add(event.delta)
            }
        }
    }
    
    public onMouseDown(): void {

        this.tool.onMouseDown = (event: paper.ToolEvent) => {
            
            if(event.item) {

                console.log(event.item)
                event.item.bringToFront();
                // event.item.scale(1.25)
                event.item.data.picked = true;

            }
        }
    }

    public onMouseUp(): void {
        
        this.tool.onMouseUp = (event: paper.ToolEvent) => {

            let pickedItem = paperCore.project.getItem({
                data: {
                    picked: true
                }
            })

            if(pickedItem) {   

                this.releaseTile(pickedItem, event);

                pickedItem.data.picked = false;
                // pickedItem.scale(0.8);
            }
        }
    }

    public releaseTile(tileGroup: paper.Item, event: paper.ToolEvent): void {

        let tileWidth = 100;
        
        let allItems = paperCore.project.getItems({
            className: "Group"
        }) as paper.Group[];

        let cellPosition = new Point(
            Math.round(event.point.x / tileWidth),
            Math.round(event.point.y / tileWidth));

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

        if (!hasConflict) {
            
            this.placeTileAtCellPosition(tileGroup, event.point, tileWidth);
        
        } else {

            let position = tileGroup.data.cellPosition.multiply(tileWidth);

            this.placeTileAtCellPosition(tileGroup, position, tileWidth);
            
        }
        
    }

    private getTileAtCellPosition(point: paper.Point, tilesArray: paper.Group[]): paper.Group {

        let tile!: paper.Group;
        
        for (let i = 0; i < tilesArray.length; i++) {

            let {x, y} = tilesArray[i].data.cellPosition;

            if (x === point.x && y === point.y) {
                tile = tilesArray[i];
                break;
            }
        }
        return tile;
    }

    private placeTileAtCellPosition(tile: paper.Item, dropPoint: paper.Point, tileWidth: number): void {

        let cellPosition = new Point(
            Math.round(dropPoint.x / tileWidth),
            Math.round(dropPoint.y / tileWidth));

        let centerDiff = tile.getItem({}).data.centerDiff;
            
        tile.position = cellPosition.multiply(tileWidth).subtract(centerDiff);
        tile.data.cellPosition = cellPosition;  
    }

    private getTileRaster(size: paper.Size, offset: paper.Point) {

        let raster = new Raster({
            crossOrigin: 'anonymous',
            source: 'http://assets.paperjs.org/images/marilyn.jpg',
        });

        raster.position = new Point(raster.width / 2 - offset.x, raster.height / 2 - offset.y);

        raster.visible = false;

        let topLeftEdge = new Point(-20, -20)
        let newSize = size.multiply(2)

        let clone = raster.getSubRaster(new Rectangle(topLeftEdge.add(offset), newSize));

        return clone;
    }
}