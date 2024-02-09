import {
    DateTime,
    DirectionsType,
    OuterPolygonRing,
    ShapeMatchType,
    StringBool,
    UnitsOfDistance,
} from './base';
import { CostingModels, CostingOptions } from './costing';
import { SupportedLanguageAlias, SupportedLanguageTags } from './languages';
import { LatLng, RequestLocation } from './locations';
import { TraceAttributesFilter, TraceOptions } from './tracing';

export interface DirectionsOptions {
    units?: UnitsOfDistance;
    language?: SupportedLanguageTags | SupportedLanguageAlias;
}

export interface MapMatchingBaseRequest {
    costing: Extract<CostingModels, 'auto' | 'bicycle' | 'bus' | 'pedestrian'>;
    shape_match: ShapeMatchType;
    costing_options?: CostingOptions;
    directions_options?: DirectionsOptions;
    directions_type?: DirectionsType;
    begin_time?: number;
    duration?: number[];
    use_timestamps?: boolean;
    trace_options?: TraceOptions;
    filter?: TraceAttributesFilter;
}

export interface MapMatchingShapeRequest extends MapMatchingBaseRequest {
    shape: LatLng[];
}

export interface MapMatchingPolylineRequest extends MapMatchingBaseRequest {
    encoded_polyline: string;
}

export interface BaseRouteRequest {
    locations: RequestLocation[];
    costing_options?: CostingOptions;
    directions_options?: DirectionsOptions;
    /*
     * none | maneuvers | instructions
     */
    directions_type?: DirectionsType;
    /*
     * ID that is returned in route response for reference
     */
    id?: string;
    /*
     * Exclude edges that are close to a set of Positions from the final route
     */
    exclude_locations?: RequestLocation[];
    /*
     * Exclude edges that intersect a set of polygons from the final route
     */
    exclude_polygons?: OuterPolygonRing[];
    /*
     * Use to define departure and arrival time
     */
    date_time?: DateTime;
    /*
     * Output format, defaults to json
     */
    out_format?: 'json' | 'pbf';
    /*
     * When present and true, the successful route response will include a key linear_references
     */
    linear_references?: StringBool;
    /*
     * Prioritize bidirectional a* when date_time.type = depart_at/current.
     * By default time_dependent_forward a* is used in these cases,
     * but bidirectional a* is much faster. Currently it does not update
     * the time (and speeds) when searching for the route path,
     * but the ETA on that route is recalculated based on the time-dependent speeds
     */
    prioritize_bidirectional?: StringBool;
}

export interface TurnByTurnRouteRequest extends BaseRouteRequest {
    costing: CostingModels;
}

export interface OptimizedRouteRequest extends BaseRouteRequest {
    costing: Extract<CostingModels, 'auto' | 'bicycle' | 'pedestrian'>;
}

export interface IsochroneBaseContour {
    color?: string;
}

export interface IsochroneTimeContour extends IsochroneBaseContour {
    time?: number;
}

export interface IsochroneDistanceContour extends IsochroneBaseContour {
    distance?: number;
}

export interface IsochroneBaseRequest extends BaseRouteRequest {
    costing: Extract<
        CostingModels,
        'auto' | 'bicycle' | 'pedestrian' | 'multimodal'
    >;
    date_time?: DateTime;
    id?: string;
    /*
     * A Boolean value to determine whether to return geojson polygons or linestrings as the contours.
     *
     * The Default value is false (returns LineStrings)
     */
    polygons?: boolean;
    /*
     * A floating point value from 0 to 1 (default of 1) which can be used to remove smaller contours.
     * A value of 1 will only return the largest contour for a given time value.
     * A value of 0.5 drops any contours that are less than half the area of
     * the largest contour in the set of contours for that same time value.
     */
    denoise?: number;
    /*
     * Floating point value in meters as the tolerance in douglas-peucker generalization
     */
    generalize?: number;
    /*
     * True, returns input location as MultiPoint, one for the search location, one for the snap to the edge
     *
     * The Default value is false
     */
    show_locations?: boolean;
}

export type IsochroneTimeRequest = IsochroneBaseRequest & {
    contours: IsochroneTimeContour[];
};

export type IsochroneDistanceRequest = IsochroneBaseRequest & {
    contours: IsochroneDistanceContour[];
};
