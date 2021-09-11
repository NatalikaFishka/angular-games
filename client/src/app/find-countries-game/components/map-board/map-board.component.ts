import { AfterViewChecked, Component, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import russiaMap from "@amcharts/amcharts4-geodata/russiaLow";

@Component({
    selector: "app-map-board",
    templateUrl: "./map-board.component.html",
    styleUrls: ["./map-board.component.scss"]
})
export class MapBoardComponent implements OnInit, AfterViewChecked {

    private polygonTemplate: any
    // @ts-ignore: Unreachable code error
    private chart: am4maps.MapChart;
    // @ts-ignore: Unreachable code error
    private polygonSeries: am4maps.MapPolygonSeries;
    public mapData: Array<string> = [];

    ngAfterViewChecked() {
        if(!this.mapData.length) {
            for (let dataSet of this.polygonSeries.data) {
                this.mapData.push(dataSet.name)
            }
            console.log('MAP DATA', this.mapData)
        }
    }

    ngOnInit() {
        this.createMap();
        this.createPolygonSeries();
        this.setMapDefinition();
        this.setMapProjection();
        this.setPolygonSeries();
        this.configurePolygonTemplate();
        this.configureHoverState();
        this.setDefaultMapPosition();        
    }    
   
    /**
     *  Create Map
     */
     private createMap(): void {
        this.chart = am4core.create("chartdiv", am4maps.MapChart);
    }
    
    /**
     * Create countries series
     */
    private createPolygonSeries(): void {
        this.polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());
    }

    /**
     * Sets particular map data (countries, regions, ect.)
     */
    private setMapDefinition(): void {
        this.chart.geodata = russiaMap;
    }

    /**
     * Sets map projection
     */
    private setMapProjection(): void {
        this.chart.projection = new am4maps.projections.Mercator();
    }

    /**
     * Make map load polygon (like country names) data from GeoJSON
     */
    private setPolygonSeries(): void {
        this.polygonSeries.useGeodata = true;
    }

    /**
     * Configure polygon template series
     */
    private configurePolygonTemplate(): void {
        this.polygonTemplate = this.polygonSeries.mapPolygons.template;
        this.polygonTemplate.tooltipText = "{name}";
        this.polygonTemplate.fill = am4core.color("#8c97d3");
        this.polygonTemplate.events.on("hit", (ev:any) => {

            console.log(ev.target)

            // @ts-ignore: Unreachable code error
            console.log(ev.target.dataItem.dataContext.name);
        });
    }

    /**
     * Configure hover state
     */
    private configureHoverState(): void {
        let hoverState = this.polygonTemplate.states.create("hover");
        hoverState.properties.fill = am4core.color("#3f51b5");
    }

    /**
     * Configure default map position
     */
    private setDefaultMapPosition() {

        this.chart.zoomToRectangle(
            this.chart.north,
            this.chart.east,
            this.chart.south,
            this.chart.west,
            1,
            true
          );

        // possibly for Russia only
        this.chart.deltaLongitude = -140;
        this.chart.homeZoomLevel = 1.3;
    }

    /**
     * Zoom In map
     */
    zoomIn() {
        this.chart.zoomIn();
    }

    /**
     * Zoom Out map
     */
    zoomOut() {
        this.chart.zoomOut();
    }

    /**
     * Reset map to it's initial position
     */
    resetMapSize() {
        this.chart.goHome();
    }
}