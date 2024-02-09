export type StringBool = 'true' | 'false';

/*
 * 0 - current departure time
 * 1 - specified departure time
 * 2 - specified arrival time
 * 3 - invariant time
 */
export type DateTimeType = 0 | 1 | 2 | 3;
export type DateTimeValue = string;

export type DateTime = {
    type: DateTimeType;
    // YYYY-MM-DDTHH:MM
    value: DateTimeValue;
};

export type OuterPolygonRing = number[][];

export type DirectionsType = 'none' | 'maneuvers' | 'instructions';

export type UnitsOfDistance = 'miles' | 'kilometers' | 'km' | 'mi';

export type ShapeMatchType = 'edge_walk' | 'map_snap' | 'walk_or_snap';

export type TravelMode =
    | 'drive'
    | 'pedestrian'
    | 'bicycle'
    | 'transit'
    | 'bikeshare';

export type TravelType =
    | 'car'
    | 'foot'
    | 'road'
    | 'tram'
    | 'metro'
    | 'rail'
    | 'bus'
    | 'ferry'
    | 'cable_car'
    | 'gondola'
    | 'funicular';

export type BSSManeuverType =
    | 'NoneAction'
    | 'RentBikeAtBikeShare'
    | 'ReturnBikeAtBikeShare';
