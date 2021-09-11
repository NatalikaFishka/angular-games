import { Component, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/russiaLow";

@Component({
    selector: "app-map-board",
    templateUrl: "./map-board.component.html",
    styleUrls: ["./map-board.component.scss"]
})
export class MapBoardComponent implements OnInit{

    ngOnInit() {

        var chart = am4core.create("chartdiv", am4maps.MapChart);

        // Set map definition
        chart.geodata = am4geodata_worldLow;

        // Set projection
        chart.projection = new am4maps.projections.Mercator();

        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;
        console.log(polygonSeries.data)

        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("#8c97d3");

        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#3f51b5");

        // polygonSeries.include = ["PT", "ES", "FR", "DE", "BE", "NL", "IT", "AT", "GB", "IE", "CH", "LU"];
        // polygonSeries.include = ["RU"];

        chart.homeGeoPoint = {
            latitude: 100,
            longitude: 105
          };
        chart.deltaLongitude = -160;
        chart.homeZoomLevel = 2;

        polygonTemplate.events.on("hit", function(ev) {
            // zoom to an object
            // ev.target.series.chart.zoomToMapObject(ev.target);
           
            // get object info
            console.log(ev.target)

            // @ts-ignore: Unreachable code error
            console.log(ev.target.dataItem.dataContext.name);
          });
    }    

}