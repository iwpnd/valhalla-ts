import { BSSManeuverType, TravelMode, TravelType } from './base';

export enum ManeuverType {
    kNone = 0,
    kStart = 1,
    kStartRight = 2,
    kStartLeft = 3,
    kDestination = 4,
    kDestinationRight = 5,
    kDestinationLeft = 6,
    kBecomes = 7,
    kContinue = 8,
    kSlightRight = 9,
    kRight = 10,
    kSharpRight = 11,
    kUturnRight = 12,
    kUturnLeft = 13,
    kSharpLeft = 14,
    kLeft = 15,
    kSlightLeft = 16,
    kRampStraight = 17,
    kRampRight = 18,
    kRampLeft = 19,
    kExitRight = 20,
    kExitLeft = 21,
    kStayStraight = 22,
    kStayRight = 23,
    kStayLeft = 24,
    kMerge = 25,
    kRoundaboutEnter = 26,
    kRoundaboutExit = 27,
    kFerryEnter = 28,
    kFerryExit = 29,
    kTransit = 30,
    kTransitTransfer = 31,
    kTransitRemainOn = 32,
    kTransitConnectionStart = 33,
    kTransitConnectionTransfer = 34,
    kTransitConnectionDestination = 35,
    kPostTransitConnectionDestination = 36,
    kMergeRight = 37,
    kMergeLeft = 38,
}

// 0 = simple stop; 1 = station
export type TransitStopType = 0 | 1;

export interface TransitStops {
    type: TransitStopType;
    onestop_id: string;
    name: string;
    arrival_date_time: string;
    departure_date_time: string;
    is_parent_stop: boolean;
    /*
     * True if the times are based on an assumed schedule
     * because the actual schedule is not known.
     */
    assumed_schedule: boolean;
    lat: number;
    lon: number;
}

export interface TransitInfo {
    onestop_id: string;
    short_name: string;
    long_name: string;
    /*
     * The sign on a public transport vehicle that identifies the route destination to passengers
     *
     * Example: "S1 - Wannsee"
     */
    headsign: string;
    /*
     * Color associated with transit route
     *
     * Example: Berlin S1 is "pink"
     */
    color: string;
    /*
     * The numeric text color value associated with a transit route.
     * The value for black would be "0".
     */
    text_color: string;
    description: string;
    operator_ones_top_id: string;
    operator_name: string;
    operator_url: string;
    /*
     * A list of the stops/stations associated with a specific transit route.
     * See TransitStop
     */
    transit_stops: TransitStops;
}

export interface ManeuverSignElement {
    text: string;
    consecutive_count?: number;
}

export interface ManeuverSign {
    /*
     * Example: { "text": "91B" }
     */
    exit_number_elements: ManeuverSignElement[];
    /*
     * Example: { "text": "I 95 North" }
     */
    exit_branch_elements: ManeuverSignElement[];
    /*
     * Example: { "text": "New York" }
     */
    exit_toward_elements: ManeuverSignElement[];
    /*
     * Example: { "text": "Your mom" }
     */
    exit_name_elements: ManeuverSignElement[];
}

export interface Maneuver {
    type: ManeuverType;
    street_names: string[];
    /*
     * Estimated time along the maneuver in seconds.
     */
    time: number;
    /*
     * Maneuver length in the units specified (mi, km).
     */
    length: number;
    /*
     * Index into the list of shape points for the start of the maneuver.
     */
    begin_shape_index: number;
    /*
     * Index into the list of shape points for the end of the maneuver.
     */
    end_shape_index: number;
    travel_mode: TravelMode;
    travel_type: TravelType;
    bss_maneuver_type?: BSSManeuverType;
    sign?: ManeuverSign;
    toll?: boolean;
    highway?: boolean;
    rough?: boolean;
    gate?: boolean;
    ferry?: boolean;
    roundabout_exit_count?: number;
}

export interface ManeuverWithInstructions extends Maneuver {
    /*
     * Written maneuver instruction. Describes the maneuver,
     * such as "Turn right onto Main Street".
     */
    instruction: string;
    /*
     * Text suitable for use as a verbal alert in a navigation application.
     *
     * Example: "Turn right onto North Prince Street"
     */
    verbal_succinct_transition_instruction: string;
    /*
     * Text suitable for use as a verbal message immediately prior to
     * the maneuver transition
     *
     * Example: "Turn right onto North Prince Street, U.S. 2 22"
     */
    verbal_pre_transition_instruction: string;
    /*
     * Text suitable for use as a verbal message immediately after the maneuver transition.
     *
     * Example: "Continue on U.S. 2 22 for 3.9 miles"
     */
    verbal_post_transition_instruction: string;
    /*
     * Written depart time instruction.
     * Typically used with a transit maneuver, such as
     *
     * Example: "Depart: 8:04 AM from 8 St - NYU".
     */
    depart_instruction?: string;
    /*
     * Text suitable for use as a verbal depart time instruction.
     * Typically used with a transit maneuver.
     *
     * Example: "Depart at 8:04 AM from 8 St - NYU".
     */
    verbal_depart_instruction?: string;
    /*
     * Written arrive time instruction.
     * Typically used with a transit maneuver,
     *
     * Example: "Arrive: 8:10 AM at 34 St - Herald Sq".
     */
    arrive_instruction?: string;
    /*
     * Text suitable for use as a verbal arrive time instruction.
     * Typically used with a transit maneuver.
     *
     * Example: "Arrive at 8:10 AM at 34 St - Herald Sq".
     */
    verbal_arrive_instruction?: string;
    /*
     * True if the verbal_pre_transition_instruction has been appended
     * with the verbal instruction of the next maneuver.
     */
    verbal_multi_cue?: boolean;
}

export interface ManeuverWithInstructionsForTransit
    extends ManeuverWithInstructions {
    transit?: TransitInfo;
}
