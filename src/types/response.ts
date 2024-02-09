import type * as GeoJSON from 'geojson';
import { UnitsOfDistance } from './base';
import { SupportedLanguageAlias, SupportedLanguageTags } from './languages';
import { ResponseLocation } from './locations';
import { Maneuver } from './maneuver';

export interface Summary {
    has_time_restrictions: boolean;
    min_lat: number;
    min_lon: number;
    max_lat: number;
    max_lon: number;
    time: number;
    length: number;
    cost: number;
    has_toll?: boolean;
    has_highway?: boolean;
    has_ferry?: boolean;
}

export interface Leg {
    summary: Summary;
    shape: string;
}

export interface LegWithManeuvers<T extends Maneuver = Maneuver> extends Leg {
    maneuvers: T[];
}

export interface Trip<T extends Leg = Leg> {
    locations: ResponseLocation[];
    legs: T[];
    /*
     * for detailed run-down see
     * [here](https://valhalla.github.io/valhalla/api/turn-by-turn/api-reference/#http-status-codes-and-conditions)
     */
    status: number;
    status_message: string;
    language: SupportedLanguageAlias | SupportedLanguageTags;
    units: UnitsOfDistance;
    summary: Summary;
    warnings?: object;
}

export interface TripResponse<T extends Leg = Leg> {
    trip: Trip<T>;
}

export interface IsochroneResponseProperties {
    fill: string;
    fillOpacity: number;
    'fill-opacity': number;
    fillColor: string;
    color: string;
    contour: number;
    opacity: number;
    metric: 'time' | 'distance';
}

export interface IsochroneResponseLocationProperties {
    location_index: number;
    type: 'snapped' | 'input';
}

export type Isochrone = GeoJSON.Feature<
    GeoJSON.MultiPoint | GeoJSON.LineString | GeoJSON.Polygon,
    IsochroneResponseProperties
>;

export type IsochroneResponse = GeoJSON.FeatureCollection<
    GeoJSON.Polygon | GeoJSON.LineString | GeoJSON.MultiPoint,
    IsochroneResponseProperties
>;

export type MapMatchingTraceRouteResponse<T extends Leg> = TripResponse<T>;

export interface MatchedPoints {
    lat: number;
    lon: number;
    type: 'matched' | 'interpolated' | 'unmatched';
    edge_index: number;
    /*
     * The boolean value is true if this match result is the begin location of a route disconnect.
     *
     * This value will not exist if this is false.
     */
    begin_route_discontinuity?: boolean;
    /*
     * The boolean value is true if this match result is the end location of a route disconnect.
     * This value will not exist if this is false.
     */
    end_route_discontinuity?: boolean;
    /*
     * The distance along the associated edge for this matched point.
     * For example, if the matched point is halfway along the edge then the value would be 0.5.
     *
     * This value will not exist if this point was unmatched.
     */
    distance_along_edge: number;
    /*
     * The distance in meters from the trace point to the matched point.
     *
     * This value will not exist if this point was unmatched.
     */
    distance_from_trace_point?: number;
}

export interface MapMatchingTraceAttributesResponse {
    units: UnitsOfDistance;
    osm_changeset: number;
    /*
     * Encoded polyline
     */
    shape: string;
    confidence_score: number;
    raw_score: number;
    admins: {
        country_text: string;
        state_text: string;
        country_code?: string;
        state_code?: string;
    }[];
    edges: object[];
    matched_points: MatchedPoints[];
}

/*
 * Status Service API
 *
 * In its base form will return version and tileset_last_modified
 *
 * If service_limits.status.allow_verbose is set to true, will also
 * return addtional.
 */
export interface StatusResponse {
    version: string;
    tileset_last_modfied: number;
}

/*
 * Status Service API
 *
 * In its base form will return version and tileset_last_modified
 *
 * If service_limits.status.allow_verbose is set to true, will also
 * return addtional.
 */
export interface ExtendedStatusResponse extends StatusResponse {
    has_tiles?: boolean;
    has_admin?: boolean;
    has_timezones?: boolean;
    has_live_traffic?: boolean;
    bbox?: object;
}
