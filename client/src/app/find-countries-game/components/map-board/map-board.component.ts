import { Component, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import { AppStore } from "src/app/app-store.model";
import { Store } from "@ngrx/store";
import { setMapCountries, setUserSelectionCountry } from "../../store/actions/find-countries-game.actions";
import { Observable } from "rxjs";
import { filter, switchMap, tap } from "rxjs/operators";
import { Map, MAPS } from "../../configs/map.config";

@Component({
    selector: "app-map-board",
    templateUrl: "./map-board.component.html",
    styleUrls: ["./map-board.component.scss"]
})
export class MapBoardComponent implements OnInit {

    private polygonTemplate: any;
    private chart!: am4maps.MapChart;
    private polygonSeries!: am4maps.MapPolygonSeries;
    public mapData!: Array<string>;
    private mapToLoad!: string;
    private mapConfig: Map | undefined;

    private foundCountriesIds$: Observable<Array<string>>;
    private mapToLoad$: Observable<string>;

    constructor(
        private store: Store<AppStore>
    ) {
        this.foundCountriesIds$ = this.store.select(store => store.findCountriesGame.gameOnState.foundCountriesIds);
        this.mapToLoad$ = this.store.select(store => store.findCountriesGame.currentMap);
    }

    ngOnInit() {

        this.mapToLoad$.pipe(
            filter(map => Boolean(map)),
            tap(map => {
                
                if(this.chart) {
                    this.killMap()
                }

                this.mapToLoad = map;
                this.mapConfig = MAPS.find((mapConfig) => mapConfig.name === this.mapToLoad);
                this.buildMapAndItsComponents();
            }),
            switchMap(() => this.foundCountriesIds$)
        ).subscribe((data) =>  this.markAsFound(data));
    }  
    
    public buildMapAndItsComponents(): void {
        this.createMap();
        this.createPolygonSeries();
        this.setMapDefinition();
        this.setMapProjection();
        this.setPolygonSeries();
        this.configurePolygonTemplate();
        this.configureHoverState();
        this.setDefaultMapPosition(); 
        this.setMapDataToStore();
    }

    public killMap() {
        this.chart.dispose();
    }

    private setMapDataToStore() {
        this.chart.events.on("ready", () => {
            
            this.mapData = [];

            for (let dataSet of this.polygonSeries.data) {
                if(dataSet.name) {
                    this.mapData.push(dataSet.name)
                }
            }

            this.store.dispatch(setMapCountries({payload: this.mapData}))
            
          });
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

        if(this.mapConfig?.include) {
            this.polygonSeries.include = this.mapConfig.include;
        }
        if(this.mapConfig?.exclude) {
            this.polygonSeries.exclude = this.mapConfig.exclude;
        }
    }

    /**
     * Sets particular map data (countries, regions, ect.)
     */
    private setMapDefinition(): void {

        if(this.mapConfig) {
            this.chart.geodata = this.mapConfig.mapData;   
        } else {
            this.mapToLoad = MAPS[0].name
            this.chart.geodata = MAPS[0].mapData;    
        }     
    }

    /**
     * Sets map projection
     */
    private setMapProjection(): void {
        if(this.mapConfig?.projection) {
            this.chart.projection = this.mapConfig.projection;
        } else {
            this.chart.projection = new am4maps.projections.Miller();
        }
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
        this.polygonTemplate.propertyFields.tooltipText = "tooltipText";
        this.polygonTemplate.events.on("hit", (ev:any) => {

            this.store.dispatch(setUserSelectionCountry({payload: ev.target.dataItem.dataContext}))
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

        if(this.mapConfig?.homeGeoPoint) {
            this.chart.homeGeoPoint = this.mapConfig.homeGeoPoint
        }

        if(this.mapConfig?.deltaLongitude) {
            this.chart.deltaLongitude = this.mapConfig.deltaLongitude
        }

        if(this.mapConfig?.deltaLatitude) {
            this.chart.deltaLatitude = this.mapConfig.deltaLatitude
        }

        if(this.mapConfig?.homeZoomLevel) {
            this.chart.homeZoomLevel = this.mapConfig.homeZoomLevel
        }

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
                    fill: am4core.color("#F05C5C"),
                    tooltipText: ''
                })
            })

            this.polygonSeries.data = countriesToFill;
        } else {
            this.polygonSeries.data = [{}]
        }
    }
}