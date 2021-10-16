import { FeatureCollection } from "@amcharts/amcharts4-geodata/.internal/Geodata";
import * as am4maps from "@amcharts/amcharts4/maps";

import worldMap from "@amcharts/amcharts4-geodata/worldLow";
// import worldMap from "@amcharts/amcharts4-geodata/worldHigh";
import russiaMap from "@amcharts/amcharts4-geodata/russiaLow";
import usaMap from "@amcharts/amcharts4-geodata/usaTerritoriesLow";
import { IGeoPoint } from "@amcharts/amcharts4/core";

export interface Map {
    name: string;
    mapData: FeatureCollection,
    projection?: am4maps.Projection,
    include?: Array<string>;
    exclude?: Array<string>;
    homeGeoPoint?: IGeoPoint,
    homeZoomLevel?: number,
    deltaLongitude?: number,
    deltaLatitude?: number
}

const WORLD: Map = {
    name: "World",
    mapData: worldMap,
    exclude: ['AQ'],
    // homeGeoPoint: {
    //     longitude: 50,
    //     latitude: 0
    // },
    deltaLongitude: -10
}

const RUSSIA: Map = {
    name: "Russia",
    mapData:  russiaMap,
    projection: new am4maps.projections.Mercator(),
    deltaLongitude: -120,
    homeZoomLevel: 1.5
};

const USA: Map = {
    name: "USA",
    mapData: usaMap,
    exclude: ['US-AS', 'US-PR', 'US-VI', 'US-GU', 'US-MP']
}

const EUROPE: Map = {
    name: "Europe",
    mapData: worldMap,
    include: ["PT", "ES", "FR", "DE", "BE", "NL", "IT", "AT", "GB", "AM",
    "IE", "CH", "LU", "DK", "NO", "SE", "FI", "EE", "LV", "LT", 
    "BY", "PL", "CZ", "SK", "HU", "SI", "HR", "BA", "RS", "ME", 
    "XK", "AL", "MK", "GR", "BG", "RO", "MD", "UA", "SM", "AD", 
    "MT", "GE", "AZ", "MC", "LI", "CY", "TR"]
}

const AFRICA: Map = {
    name: "Africa",
    mapData: worldMap,
    include: ['MA', 'EH', 'TN', 'DZ', 'MR', 'SN', 'GM', 'GW', 'GN', 'SL', 
    'LR', 'ML', 'CI', 'GH', 'TG', 'BJ', 'LY', 'EG', 'BF', 'NG', 
    'NE', 'TD', 'EG', 'SD', 'CM', 'CF', 'SS', 'ER', 'ET', 'DJ', 
    'SO', 'KE', 'GA', 'GQ', 'CG', 'CD', 'UG', 'TZ', 'RW', 'BI', 
    'AO', 'ZM', 'MW', 'MZ', 'MG', 'ZW', 'NA', 'BW', 'ZA', 'LS', 
    'SZ', 'MU']
}

const ASIA: Map = {
    name: "Asia",
    mapData: worldMap,
    include: ['TR', 'GE', 'AZ', 'AM', 'IR', 'IQ', 'SY', 'LB', 'IL', 'PS', 
    'JO', 'SA', 'QA', 'AE', 'OM', 'YE', 'RU', 'KZ', 'MN', 'JP', 
    'CN', 'KP', 'KR', 'UZ', 'KG', 'TJ', 'TM', 'AF', 'PK', 'IN', 
    'NP', 'BT', 'BD', 'MM', 'VN', 'LA', 'TH', 'KH', 'MY', 'LK', 
    'ID', 'PH', 'TW', 'TL', 'BN', 'BH', 'SG'],
    deltaLongitude: -140,
    homeZoomLevel: 1.3
}

const AUSTRALIA: Map = {
    name: "Australia",
    mapData: worldMap,
    include: ['AU', 'PG', 'SB', 'VU', 'FJ', 'WS', 'NC', 'NZ'],
    deltaLongitude: -160,
    homeZoomLevel: 2.4
}

const SOUTH_AMERICA: Map = {
    name: "South America",
    mapData: worldMap,
    include: ['CO', 'VE', 'GY', 'SR', 'GF', 'BR', 'EC', 'PE', 
    'BO', 'PY', 'AR', 'CL', 'UY', 'FK', 'GS']
}

const NORTH_AMERICA: Map = {
    name: "North America",
    mapData: worldMap,
    include: ['IS', 'GL', 'CA', 'US', 'MX', 'BS', 'CU', 'HT', 'DO', 'PR', 
    'JM', 'MQ', 'TT', 'BZ', 'GT', 'SV', 'HN', 'NI', 'CR', 'PA', 
    'AW', 'CW', 'BQ', 'VI', 'KN', 'AG', 'MS', 'GP', 'DM', 'LC', 
    'VC', 'BB', 'GD', 'TC', 'VG', 'AI', 'MF', 'SX', 'BL', 'KY',
    'PM']
}

// const ANTARCTICA: Map = {
//     name: "Antarctica",
//     mapData: worldMap,
//     include: ['AQ'],
//     deltaLatitude: 90
// }

export const MAPS: Array<Map> = [
    WORLD,
    NORTH_AMERICA,
    SOUTH_AMERICA,
    EUROPE,
    AFRICA,
    ASIA,
    AUSTRALIA,
    // ANTARCTICA,
    RUSSIA,
    USA,
]
