import { AfterViewChecked, Component, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import russiaMap from "@amcharts/amcharts4-geodata/russiaLow";
import { AppStore } from "src/app/app-store.model";
import { Store } from "@ngrx/store";
import { setMapCountries, setUserSelectionCountry } from "../../store/actions/find-countries-game.actions";
import { Observable } from "rxjs";

@Component({
    selector: "app-map-board",
    templateUrl: "./map-board.component.html",
    styleUrls: ["./map-board.component.scss"]
})
export class MapBoardComponent implements OnInit, AfterViewChecked {

    private polygonTemplate: any;
    private chart!: am4maps.MapChart;
    private polygonSeries!: am4maps.MapPolygonSeries;
    public mapData: Array<string> = [];

    private foundCountry$: Observable<Array<string>>;

    constructor(
        private store: Store<AppStore>
    ) {
        this.foundCountry$ = this.store.select(store => store.findCountriesGame.foundCountry)
    }

    ngAfterViewChecked() {
        if(!this.mapData.length) {
            for (let dataSet of this.polygonSeries.data) {
                this.mapData.push(dataSet.name)
            }
            
            if(this.mapData.length) {
                this.store.dispatch(setMapCountries({payload: this.mapData}))
            }
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
        
        this.foundCountry$.subscribe(
            (data) => this.markAsFound(data)
        )
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
        this.polygonTemplate.propertyFields.fill = "fill";
        this.polygonTemplate.propertyFields.hoverable = "hoverable";
        this.polygonTemplate.events.on("hit", (ev:any) => {

            this.store.dispatch(setUserSelectionCountry({payload: ev.target.dataItem.dataContext}))
            // @ts-ignore: Unreachable code error
            console.log(ev.target.dataItem.dataContext.name);
        });

        // this.polygonTemplate.
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
    public zoomIn(): void {
        this.chart.zoomIn();
    }

    /**
     * Zoom Out map
     */
    public zoomOut(): void {
        this.chart.zoomOut();
    }

    /**
     * Reset map to it's initial position
     */
    public resetMapSize(): void {
        this.chart.goHome();
    }

    /**
     * Mark countries as found
     */
    private markAsFound(data: Array<string>): void {
        if(data.length) {
            
            let countriesToFill: any = [];
            data.forEach((dataId) => {
                countriesToFill.push({
                    id: dataId,
                    hoverable: false,
                    fill: am4core.color("#F05C5C")
                })
            })

            this.polygonSeries.data = countriesToFill;
        }
    }
}