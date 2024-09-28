import { StringBool } from './base';

/**
 * Road classes used in routing
 */
export type RoadClass =
    | 'motorway'
    | 'trunk'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'unclassified'
    | 'residential'
    | 'service_other';

export type PreferredSide = 'same' | 'opposite' | 'either';

/**
 * LocationType
 * - break: u-turn allowed, generate guidance, create legs from
 * - through: u-turn not allowed, not guidance, not new legs, just passthrough
 * - via: u-turn allowed, no legs
 * - break_through: u-turn not allowed, create legs from
 *
 * first and last position of a request are always considered a break point
 */
export type LocationType = 'break' | 'break_through' | 'through' | 'via';

type LocationSearchFilter = {
    /**
     * Exclude tunnel edges
     */
    exclude_tunnel?: StringBool;
    /**
     * Exclude bridge edges
     */
    exclude_bridge?: StringBool;
    /**
     * Exclude ramp edges
     */
    exclude_ramp?: StringBool;
    /**
     * Exclude closure edges
     */
    exclude_closure?: StringBool;
    /**
     * lowest road class allowed to snap to, defaults to 'service_other'
     */
    min_road_class?: RoadClass;
    /**
     * highest road class allowed to snap to, defaults to 'motorway'
     */
    max_road_class?: RoadClass;
};

export interface Position {
    /**
     * Latitude, duh
     */
    lat: number;
    /**
     * Longitude, duh
     */
    lon: number;
}

export interface ResponseLocation extends Position {
    /**
     * The order of the location on the initial request
     */
    original_index: number;
    /**
     * @see {@link LocationType}
     */
    type: LocationType;
}

export interface RequestLocation
    extends Omit<ResponseLocation, 'original_index' | 'type'> {
    /**
     * Additional location information that is forward in the response
     * name, might be used in routing narration <arrived at "${name}">
     */
    name?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    phone?: string;
    url?: string;
    /**
     * Time in seconds to spend at location, only for type break or break_through
     */
    waiting?: number;
    /**
     * preferred direction of travel for start
     */
    heading?: number;
    /**
     * tolerance as to when a street would be considered to be
     * the same as heading parameter. (default: 60)
     */
    heading_tolerance?: number;
    /**
     * aid in finding the correct street at a given lat/lon, not yet implemented
     * @exprimental
     */
    street?: string;
    /**
     * OSM id of a way to aid in finding the correct routing at a given lat/lon
     */
    way_id?: number;
    /**
     * Minimum number of nodes for a given edge to be considered connected to a region
     * default: 50 reachable nodes
     */
    minimum_reachability?: number;
    /**
     * Number of meters around the input lat/lon in which edges will be considered.
     * If non are found, Valhalla will try to find the closest edge.
     * default: 0 meters
     */
    radius?: number;
    /**
     * If "true", candidate edges will be ranked based upon their distance to input lat/lon
     * If "false", all candidate edges will be treated equal with emphesis on optimal route
     */
    rank_candidates?: StringBool;
    /**
     * - "same": e.g. drive on the right side, end on the right side
     * - "opposite": e.g. drive on the right side, end on the left side
     * - "either": e.g. nobody cares bruh
     */
    preferred_side?: PreferredSide;
    /**
     * If provided lat/lon will be used for routing location, display_lat/display_lon will be
     * used to show street side location
     */
    display_lat?: number;
    /**
     * If provided lat/lon will be used for routing location, display_lat/display_lon will be
     * used to show street side location
     */
    display_lon?: number;
    /**
     * cutoff at which Valhalla will be considering an input of being too far to away from network to route to
     */
    search_cutoff?: number;
    /**
     * distance in meters when to snap to intersection or stay on street
     * default: 5 meters
     */
    node_snap_tolerance?: number;
    /**
     * if inpout coordinate is less than tolerance away from the edge, then Valhalla set side of
     * street to None, otherwise left or right depending on direction of travel
     */
    street_side_tolerance?: number;
    /**
     * max distance in meters that input lat/lon are considered to determine side of street
     */
    streetside_max_distance?: number;
    /**
     * set of optional filters to exclude edges from the route
     */
    search_filter?: LocationSearchFilter;
}

export interface LatLng {
    lat: number;
    lon: number;
    time?: number;
    type?: LocationType;
}
