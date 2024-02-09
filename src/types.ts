import type * as GeoJSON from 'geojson';

type bool = 'true' | 'false';

/**
 * Costing Models used in routing
 */
export type CostingModels =
    | 'pedestrian'
    | 'bicycle'
    | 'auto'
    | 'bus'
    | 'bikeshare'
    | 'truck'
    | 'taxi'
    | 'motor_scooter'
    | 'motorcycle'
    | 'multimodal';

/**
 * Automobile costing options that can be used during routing.
 */
export interface BaseMotorizedVehicleCostingOptions {
    /**
     * A penalty applied when transitioning between roads that do not have
     * consistent naming–in other words, no road names in common.
     * This penalty can be used to create simpler routes that tend to have
     * fewer maneuvers or narrative guidance instructions.
     * The default maneuver penalty is five seconds.
     */
    maneuver_penalty?: number;
    /**
     * A cost applied when a gate with undefined or private access
     * is encountered. This cost is added to the estimated time / elapsed time.
     * The default gate cost is 30 seconds.
     */
    gate_cost?: number;
    /**
     * A penalty applied when a gate with no access information is on the road.
     * The default gate penalty is 300 seconds.
     */
    gate_penalty?: number;
    /**
     * A penalty applied when a gate or bollard with access=private is encountered.
     * The default private access penalty is 450 seconds.
     */
    private_access_penalty?: number;
    /**
     * A cost applied when a toll booth is encountered.
     * This cost is added to the estimated and elapsed times.
     * The default cost is 15 seconds.
     */
    toll_booth_cost?: number;
    /**
     * A penalty applied to the cost when a toll booth is encountered.
     * This penalty can be used to create paths that avoid toll roads.
     * The default toll booth penalty is 0.
     */
    toll_booth_penalty?: number;
    /**
     * A cost applied when entering a ferry.
     * This cost is added to the estimated and elapsed times.
     * The default cost is 300 seconds (5 minutes).
     */
    ferry_cost?: number;
    /**
     * This value indicates the willingness to take ferries.
     * This is a range of values between 0 and 1.
     * Values near 0 attempt to avoid ferries and values near 1 will favor ferries.
     * The default value is 0.5.
     *
     * Note that sometimes ferries are required to complete a route so values of 0
     * are not guaranteed to avoid ferries entirely.
     */
    use_ferry?: number;
    /**
     * This value indicates the willingness to take highways.
     * This is a range of values between 0 and 1.
     * Values near 0 attempt to avoid highways and values near 1 will favor highways.
     *
     * The default value is 1.0.
     *
     * Note that sometimes highways are required to complete a route so values of 0
     * are not guaranteed to avoid highways entirely.
     */
    use_highways?: number;
    /**
     * This value indicates the willingness to take roads with tolls.
     * This is a range of values between 0 and 1.
     * Values near 0 attempt to avoid tolls and values near 1 will not attempt to avoid them.
     * The default value is 0.5.
     *
     * Note that sometimes roads with tolls are required to complete a route so values of 0
     * are not guaranteed to avoid them entirely.
     */
    use_tolls?: number;
    /**
     * This value indicates the willingness to take living streets.
     * This is a range of values between 0 and 1.
     * Values near 0 attempt to avoid living streets and values near 1 will favor living streets.
     * The default value is 0 for trucks, 0.1 for cars, buses, motor scooters and motorcycles.
     *
     * Note that sometimes living streets are required to complete a route so values of 0
     * are not guaranteed to avoid living streets entirely.
     */
    use_living_streets?: number;
    /**
     * This value indicates the willingness to take track roads.
     * This is a range of values between 0 and 1.
     * Values near 0 attempt to avoid tracks and values near 1 will favor tracks a little bit.
     * The default value is 0 for autos, 0.5 for motor scooters and motorcycles.
     path x*
     * Note that sometimes tracks are required to complete a route so values of 0
     * are not guaranteed to avoid tracks entirely.
     */
    use_tracks?: number;
    /*
     * A penalty applied for transition to generic service road.
     * The default penalty is 0 trucks and 15 for cars, buses, motor scooters and motorcycles.
     */
    service_penalty?: number;
    /*
     * A factor that modifies (multiplies) the cost when generic service roads are encountered.
     * The default service_factor is 1.
     */
    service_factor?: number;
    /*
     * A cost applied when encountering an international border.
     * This cost is added to the estimated and elapsed times.
     * The default cost is 600 seconds.
     */
    country_crossing_cost?: number;
    /*
     * A penalty applied for a country crossing.
     * This penalty can be used to create paths that avoid spanning country boundaries.
     * The default penalty is 0.
     */
    country_crossing_penalty?: number;
    /*
     * Changes the metric to quasi-shortest, i.e. purely distance-based costing.
     *
     * Note, this will disable all other costings & penalties.
     * Also note, shortest will not disable hierarchy pruning,
     * leading to potentially sub-optimal routes for some costing models.
     *
     * The default is false.
     */
    shortest?: bool;
    /*
     * Top speed the vehicle can go.
     * Also used to avoid roads with higher speeds than this value.
     * top_speed must be between 10 and 252 KPH.
     * The default value is 140 KPH.
     */
    top_speed?: number;
    /*
     * Fixed speed the vehicle can go.
     * Used to override the calculated speed.
     * Can be useful if speed of vehicle is known.
     * fixed_speed must be between 1 and 252 KPH.
     * The default value is 0 KPH which disables fixed speed and falls back
     * to the standard calculated speed based on the road attribution.
     */
    fixed_speed?: number;
    /*
     * If set to true, ignores all closures, marked due to live traffic closures, during routing.
     * Note: This option cannot be set if location.search_filter.exclude_closures is also specified
     * in the request and will return an error if it is
     */
    ignore_closures?: bool;
    /*
     * A factor that penalizes the cost when traversing a closed edge
     * Its value can range from 1.0 - don't penalize closed edges,
     * to 10.0 - apply high cost penalty to closed edges.
     *
     * Default value is 9.0.
     *
     * Note: This factor is applicable only for motorized modes of transport, i.e auto, motorcycle, motor_scooter, bus, truck & taxi.
     */
    closure_factor?: number;
}

/*
 * MotorizedPassengerVehicleOptions are available for auto, bus, taxi, and truck costing
 */
export interface MotorizedVehicleCostingOptions
    extends BaseMotorizedVehicleCostingOptions {
    /*
     * The height of the vehicle (in meters).
     * Default 1.9 for car, bus, taxi and 4.11 for truck.
     */
    height?: number;
    /*
     * The width of the vehicle (in meters).
     * Default 1.6 for car, bus, taxi and 2.6 for truck.
     */
    width?: number;
    /*
     * This value indicates whether or not the path may include unpaved roads.
     * If exclude_unpaved is set to 1 it is allowed to start and end with unpaved roads,
     * but is not allowed to have them in the middle of the route path,
     * otherwise they are allowed.
     * Default false.
     */
    exclude_unpaved?: 1 | 'false';
    /*
     * A boolean value which indicates the desire to avoid routes with cash-only tolls.
     * Default false.
     */
    exclude_cash_only_tolls?: bool;
    /*
     * A boolean value which indicates the desire to include HOV roads with a
     * 2-occupant requirement in the route when advantageous.
     *
     * Default false.
     */
    include_hov2?: bool;
    /*
     * A boolean value which indicates the desire to include HOV roads with a
     * 3-occupant requirement in the route when advantageous.
     *
     * Default false.
     */
    include_hov3?: bool;
    /*
     * A boolean value which indicates the desire to include tolled HOV roads
     * which require the driver to pay a toll if the occupant requirement isn't met.
     *
     * Default false.
     */
    include_hot?: bool;
}

/*
 * TruckCostingOptions are only available for truck
 */
export interface TruckCostingOptions extends MotorizedVehicleCostingOptions {
    /*
     * The length of the truck (in meters).
     * Default 21.64.
     */
    length?: number;
    /*
     * The weight of the truck (in tons).
     * Default 9.07.
     */
    weight?: number;
    /*
     * The axle load of the truck (in metric tons).
     * Default 9.07.
     */
    axle_load?: number;
    /*
     * The axle count of the truck .
     * Default 5.
     */
    axle_count?: number;
    /*
     * A value indicating if the truck is carrying hazardous materials.
     * Default false.
     */
    hazmat?: bool;
}

/*
 * PedestrianCostingOptions
 */
export interface PedestrianCostingOptions {
    /*
     * Walking speed in kilometers per hour (km/h). Must be between 0.5km/h and 25km/h
     *
     * Default value is 5.1 km/h
     */
    walking_speed?: number;
    /*
     * Factor to modify the cost when encountering a road classified as footway.
     * Pedestrian routing will generally prefer sidwalks and footpath over other roads.
     *
     * The Default value is 1.
     */
    walkway_factor?: number;
    /*
     * Factor to modify the cost when encountering roads with dedicated sidewalks.
     *
     * The Default value is 1
     */
    sidewalk_factor?: number;
    /*
     * Factor to modify (multiply) the cost when encountering alleys. Pedestrian routing wants to
     * generally dis-favor alleys and narrow buildings between houses.
     *
     * The Default value is 2.0
     */
    alley_factor?: number;
    /*
     * Factor to modify (multiply) the cost when encountering driveways.
     * Pedestrian routing will try to avoid them.
     *
     * The Default value is 5.0
     */
    driveway_factor?: number;
    /*
     * A penalty added to each path with steps or stairs.
     *
     * The Default value is 2.0
     */
    step_penalty?: number;
    /*
     * A pedestrians's desire to tackle hills in their routes.
     * This is a range of values from 0 to 1,
     * where 0 attempts to avoid hills and steep grades even if it means a longer (time and distance) path,
     * while 1 indicates the rider does not fear hills and steeper grades.
     *
     * The default value is 0.5
     */
    use_hills?: number;
    /*
     * This value indicates the willingness to take ferries.
     * This is a range of values between 0 and 1.
     * Values near 0 attempt to avoid ferries and values near 1 will favor ferries.
     *
     * Note that sometimes ferries are required to complete a route so values of 0
     * are not guaranteed to avoid ferries entirely.
     *
     * The default value is 0.5.
     */
    use_ferry?: number;
    /*
     * This value indicates the willingness to take living streets.
     * This is a range of values between 0 and 1.
     *
     * Values near 0 attempt to avoid living streets and
     * values from 0.5 to 1 will currently have no effect on route selection.
     *
     * The default value is 0.5.
     *
     * Note that sometimes living streets are required to complete a route so values of 0
     * are not guaranteed to avoid living streets entirely.
     */
    use_living_streets?: number;
    /**
     * This value indicates the willingness to take track roads.
     * This is a range of values between 0 and 1.
     * Values near 0 attempt to avoid tracks and values near 1 will favor tracks a little bit.
     * The default value is 0 for autos, 0.5 for motor scooters and motorcycles.
     *
     * Note that sometimes tracks are required to complete a route so values of 0
     * are not guaranteed to avoid tracks entirely.
     */
    use_tracks?: number;
    /*
     * A penalty applied for transition to generic service road.
     * The default penalty is 0 trucks and 15 for cars, buses, motor scooters and motorcycles.
     */
    service_penalty?: number;
    /*
     * A factor that modifies (multiplies) the cost when generic service roads are encountered.
     * The default service_factor is 1.
     */
    service_factor?: number;
    /*
     * This value indicates the maximum difficulty of hiking trails that is allowed.
     *
     * Values between 0 and 6 are allowed.
     *
     * The values correspond to sac_scale values within OpenStreetMap,
     * see [here](https://wiki.openstreetmap.org/wiki/Key:sac_scale)
     *
     * The Default value is 1 which means that well cleared trails that are mostly flat or slightly sloped are allowed.
     * Higher difficulty trails can be allowed by specifying a higher value for max_hiking_difficulty.
     */
    max_hiking_difficulty?: number;
    /*
     * BSS = Bikeshare scheme
     * This value is useful when bikeshare is chosen as travel mode.
     * It is meant to give the time will be used to return a rental bike.
     * This value will be displayed in the final directions and used to
     * calculate the whole duation.
     *
     * The default value is 120 seconds.
     */
    bss_return_cost?: number;
    /*
     * This value is useful when bikeshare is chosen as travel mode.
     *
     * It is meant to describe the potential effort to return a rental bike.
     * This value won't be displayed and used only inside of the algorithm.
     */
    bss_return_penalty?: number;
    /*
     * Changes the metric to quasi-shortest, i.e. purely distance-based costing.
     *
     * Note, this will disable all other costings & penalties.
     * Also note, shortest will not disable hierarchy pruning, leading to
     * potentially sub-optimal routes for some costing models.
     *
     * The default is false.
     */
    shortest?: boolean;
}

export type BiycleType =
    // bicycle for city or casual riding on paved surfaces
    | 'Hybrid'
    | 'City'
    // biycle with narrow tires designed for speed on paved surfaces
    | 'Road'
    // cycle-cross bicycle, like road but with wider tires suitable for rougher surfaces
    | 'Cross'
    // mountain bicycle for most surfaces, but slower on paved
    | 'Mountain';

/*
 * BiycleCostingOptions
 */
export interface BicycleCostingOptions {
    /*
     * type of bicycle
     */
    bicycle_type?: BiycleType;
    /*
     * Cycling speed is the average travel speed along smooth, flat roads.
     *
     * When no speed is specifically provided, the default speed is determined by the bicycle type and are as follows:
     * Road = 25 KPH (15.5 MPH),
     * Cross = 20 KPH (13 MPH),
     * Hybrid/City = 18 KPH (11.5 MPH),
     * and Mountain = 16 KPH (10 MPH).
     */
    cycling_speed?: number;
    /*
     * A cyclist's propensity to use roads alongside other vehicles.
     * This is a range of values from 0 to 1, where 0 attempts to avoid roads and stay on cycleways and paths,
     * and 1 indicates the rider is more comfortable riding on roads.
     * Based on the use_roads factor, roads with certain classifications
     * and higher speeds are penalized in an attempt to avoid them when finding the best path.
     *
     * The default value is 0.5.
     */
    use_roads?: number;
    /*
     * A cyclist's desire to tackle hills in their routes.
     * This is a range of values from 0 to 1,
     * where 0 attempts to avoid hills and steep grades even if it means a longer (time and distance) path,
     * while 1 indicates the rider does not fear hills and steeper grades.
     *
     * The default value is 0.5
     */
    use_hills?: number;
    /*
     * This value indicates the willingness to take ferries.
     * This is a range of values between 0 and 1.
     * Values near 0 attempt to avoid ferries and values near 1 will favor ferries.
     *
     * Note that sometimes ferries are required to complete a route so values of 0
     * are not guaranteed to avoid ferries entirely.
     *
     * The default value is 0.5.
     */
    use_ferry?: number;
    /*
     * This value indicates the willingness to take living streets.
     * This is a range of values between 0 and 1.
     *
     * Values near 0 attempt to avoid living streets and
     * values from 0.5 to 1 will currently have no effect on route selection.
     *
     * The default value is 0.5.
     *
     * Note that sometimes living streets are required to complete a route so values of 0
     * are not guaranteed to avoid living streets entirely.
     */
    use_living_streets?: number;
    /*
     * This value is meant to represent how much a cyclist wants to avoid
     * roads with poor surfaces relative to the bicycle type being used.
     *
     * This is a range of values between 0 and 1.
     * With 1 avoiding all bad surfaces, and 0 no penalization at all.
     *
     * The default value is 0.25.
     */
    avoid_bad_surfaces?: number;
    /*
     * BSS = Bikeshare scheme
     * This value is useful when bikeshare is chosen as travel mode.
     * It is meant to give the time will be used to return a rental bike.
     * This value will be displayed in the final directions and used to
     * calculate the whole duation.
     *
     * The default value is 120 seconds.
     */
    bss_return_cost?: number;
    /*
     * This value is useful when bikeshare is chosen as travel mode.
     *
     * It is meant to describe the potential effort to return a rental bike.
     * This value won't be displayed and used only inside of the algorithm.
     */
    bss_return_penalty?: number;
    /*
     * Changes the metric to quasi-shortest, i.e. purely distance-based costing.
     *
     * Note, this will disable all other costings & penalties.
     * Also note, shortest will not disable hierarchy pruning, leading to potentially sub-optimal routes for some costing models.
     *
     * The default is false.
     */
    shortest?: bool;
    /**
     * A penalty applied when transitioning between roads that do not have
     * consistent naming–in other words, no road names in common.
     * This penalty can be used to create simpler routes that tend to have
     * fewer maneuvers or narrative guidance instructions.
     * The default maneuver penalty is five seconds.
     */
    maneuver_penalty?: number;
    /**
     * A cost applied when a gate with undefined or private access
     * is encountered. This cost is added to the estimated time / elapsed time.
     * The default gate cost is 30 seconds.
     */
    gate_cost?: number;
    /**
     * A penalty applied when a gate with no access information is on the road.
     * The default gate penalty is 300 seconds.
     */
    gate_penalty?: number;
    /*
     * A penalty applied for transition to generic service road.
     * The default penalty is 0 trucks and 15 for cars, buses, motor scooters and motorcycles.
     */
    service_penalty?: number;
    /*
     * A cost applied when encountering an international border.
     * This cost is added to the estimated and elapsed times.
     * The default cost is 600 seconds.
     */
    country_crossing_cost?: number;
    /*
     * A penalty applied for a country crossing.
     * This penalty can be used to create paths that avoid spanning country boundaries.
     * The default penalty is 0.
     */
    country_crossing_penalty?: number;
}

/*
 * MotorScooterCostingOptions
 */
export interface MotorScooterCostingOptions
    extends MotorizedVehicleCostingOptions {
    /*
     * Top speed the motorized scooter can go.
     * Used to avoid roads with higher speeds than this value.
     * For motor_scooter this value must be between 20 and 120 KPH.
     *
     * The default value is 45 KPH (~28 MPH)
     */
    top_speed?: number;
    /*
     * A riders's willingness to use primary roads.
     * This is a range of values from 0 to 1, where
     * 0 attempts to avoid primary roads, and
     * 1 indicates the rider is more comfortable riding on primary roads.
     *
     * The default value is 0.5
     */
    use_primary?: number;
    /*
     * A scooter drivers desire to tackle hills in their routes.
     * This is a range of values from 0 to 1,
     * where 0 attempts to avoid hills and steep grades even if it means a longer (time and distance) path,
     * while 1 indicates the rider does not fear hills and steeper grades.
     *
     * The default value is 0.5
     */
    use_hills?: number;
}

/*
 * MotorcycleCostingOptions
 */
export interface MotorcycleCostingOptions extends MotorScooterCostingOptions {
    /**
     * This value indicates the willingness to take highways.
     * This is a range of values between 0 and 1.
     * Values near 0 attempt to avoid highways and values near 1 will favor highways.
     * The default value is 1.0.
     *
     * Note that sometimes highways are required to complete a route so values of 0
     * are not guaranteed to avoid highways entirely.
     */
    use_highways?: number;
    /*
     * A riders's desire for adventure in their routes.
     * This is a range of values from 0 to 1, where
     *
     * 0 will avoid trails, tracks, unclassified or bad surfaces and
     * values towards 1 will tend to avoid major roads and route on secondary roads.
     *
     * The default value is 0.0.
     */
    use_trial?: number;
}

export type TransitCostingFilter = {
    ids: string[];
    action: 'exclude' | 'include';
};

/*
 * TransitCostingOptions
 */
export interface TransitCostingOptions {
    /*
     * User's desire to use buses.
     * Range of values from 0 (try to avoid buses) to
     * 1 (strong preference for riding buses).
     */
    use_bus?: number;
    /*
     * User's desire to use rail/subway/metro.
     * Range of values from 0 (try to avoid rail) to
     * 1 (strong preference for riding rail).
     */
    use_rail?: number;
    /*
     * User's desire to favor transfers.
     * Range of values from 0 (try to avoid transfers) to
     * 1 (totally comfortable with transfers).
     */
    use_transfers?: number;
    /*
     * This is the maximum accepted walking distance at the beginning or end of a route for
     * a pedestrian.
     *
     * The Default value is 2145 meters
     */
    transit_start_end_max_distance?: number;
    /*
     * Maximum accepted walking distances in transfers
     *
     * The Default value is 800 meters
     */
    transit_transfer_max_distance?: number;
    /*
     * A way to filter for one or more stops, routes, or operators.
     * Filters must contain a list of Onestop IDs,
     * which is a unique identifier for Transitland data, and an action.
     *
     * Example: [{"action": "exclude", ids: ["o-9q9-bart"]}]
     */
    filters?: TransitCostingFilter[];
}

export type CostingOptions = {
    auto?: MotorizedVehicleCostingOptions;
    taxi?: MotorizedVehicleCostingOptions;
    bus?: MotorizedVehicleCostingOptions;
    bicycle?: BicycleCostingOptions;
    pedestrian?: PedestrianCostingOptions;
    truck?: TruckCostingOptions;
    motorcycle?: MotorcycleCostingOptions;
    motor_scooter?: MotorScooterCostingOptions;
    multimodal?: TransitCostingOptions;
};

export type SupportedLanguageTags =
    | 'bg-BG' // Bulgarian
    | 'ca-ES' // Catalan
    | 'cs-CZ' // Czech
    | 'da-DK' // Danish
    | 'de-DE' // German
    | 'el-GR' // Greek
    | 'en-GB' // English
    | 'en-US-x-pirate' // Pirate English
    | 'en-US' // US English
    | 'es-ES' // Spanish
    | 'et-EE' // Estonian
    | 'fi-FI' // Finnish
    | 'fr-FR' // French
    | 'hi-IN' // Hindhi
    | 'hu-HU' // Hungarian
    | 'it-IT' // Italian
    | 'ja-JP' // Japanese
    | 'nb-NO' // Norwegian
    | 'nl-NL' // Dutch
    | 'pl-PL' // Polish
    | 'pt-BR' // Portuguese (Brazil)
    | 'pt-PT' // Portuguese
    | 'ro-RO' // Romanian
    | 'ru-RU' // Russian
    | 'sk-SK' // Slovak
    | 'sl-SI' // Slowenian
    | 'sv-SE' // Swedish
    | 'tr-TR' // Turkish
    | 'uk-UA'; // Ukrainian

export type SupportedLanguageAlias =
    | 'bg'
    | 'ca'
    | 'cs'
    | 'da'
    | 'de'
    | 'el'
    | 'en-x-pirate'
    | 'en'
    | 'es'
    | 'et'
    | 'fi'
    | 'fr'
    | 'hi'
    | 'hu'
    | 'it'
    | 'ja'
    | 'nb'
    | 'nl'
    | 'pl'
    | 'pt'
    | 'ro'
    | 'ru'
    | 'sk'
    | 'sl'
    | 'sv'
    | 'tr'
    | 'uk';

export type DirectionsType = 'none' | 'maneuvers' | 'instructions';

export type UnitsOfDistance = 'miles' | 'kilometers' | 'km' | 'mi';

export interface DirectionsOptions {
    units?: UnitsOfDistance;
    language?: SupportedLanguageTags | SupportedLanguageAlias;
}

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

/*
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
    /*
     * Exclude tunnel edges
     */
    exclude_tunnel?: bool;
    /*
     * Exclude bridge edges
     */
    exclude_bridge?: bool;
    /*
     * Exclude ramp edges
     */
    exclude_ramp?: bool;
    /*
     * Exclude closure edges
     */
    exclude_closure?: bool;
    /*
     * lowest road class allowed to snap to, defaults to 'service_other'
     */
    min_road_class?: RoadClass;
    /*
     * highest road class allowed to snap to, defaults to 'motorway'
     */
    max_road_class?: RoadClass;
};

export type Location = {
    /*
     * Latitude, duh
     */
    lat: number;
    /*
     * Longitude, duh
     */
    lon: number;
    /*
     * @see {@link LocationType}
     */
    type?: LocationType;

    /*
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
    /*
     * Time in seconds to spend at location, only for type break or break_through
     */
    waiting?: number;
    /*
     * preferred direction of travel for start
     */
    heading?: number;
    /*
     * tolerance as to when a street would be considered to be
     * the same as heading parameter. (default: 60)
     */
    heading_tolerance?: number;
    /*
     * aid in finding the correct street at a given lat/lon, not yet implemented
     * @exprimental
     */
    street?: string;
    /*
     * OSM id of a way to aid in finding the correct routing at a given lat/lon
     */
    way_id?: number;
    /*
     * Minimum number of nodes for a given edge to be considered connected to a region
     * default: 50 reachable nodes
     */
    minimum_reachability?: number;
    /*
     * Number of meters around the input lat/lon in which edges will be considered.
     * If non are found, Valhalla will try to find the closest edge.
     * default: 0 meters
     */
    radius?: number;
    /*
     * If "true", candidate edges will be ranked based upon their distance to input lat/lon
     * If "false", all candidate edges will be treated equal with emphesis on optimal route
     */
    rank_candidates?: bool;
    /*
     * - "same": e.g. drive on the right side, end on the right side
     * - "opposite": e.g. drive on the right side, end on the left side
     * - "either": e.g. nobody cares bruh
     */
    preferred_side?: PreferredSide;
    /*
     * If provided lat/lon will be used for routing location, display_lat/display_lon will be
     * used to show street side location
     */
    display_lat?: number;
    /*
     * If provided lat/lon will be used for routing location, display_lat/display_lon will be
     * used to show street side location
     */
    display_lon?: number;
    /*
     * cutoff at which Valhalla will be considering an input of being too far to away from network to route to
     */
    search_cutoff?: number;
    /*
     * distance in meters when to snap to intersection or stay on street
     * default: 5 meters
     */
    node_snap_tolerance?: number;
    /*
     * if inpout coordinate is less than tolerance away from the edge, then Valhalla set side of
     * street to None, otherwise left or right depending on direction of travel
     */
    street_side_tolerance?: number;
    /*
     * max distance in meters that input lat/lon are considered to determine side of street
     */
    streetside_max_distance?: number;
    /*
     * set of optional filters to exclude edges from the route
     */
    search_filter?: LocationSearchFilter;
};

type OuterPolygonRing = number[][];

/*
 * 0 - current departure time
 * 1 - specified departure time
 * 2 - specified arrival time
 * 3 - invariant time
 */
type DateTimeType = 0 | 1 | 2 | 3;
type DateTimeValue = string;

export type DateTime = {
    type: DateTimeType;
    // YYYY-MM-DDTHH:MM
    value: DateTimeValue;
};

export interface BaseRouteRequest {
    locations: Location[];
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
    exclude_locations?: Location[];
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
    linear_references?: bool;
    /*
     * Prioritize bidirectional a* when date_time.type = depart_at/current.
     * By default time_dependent_forward a* is used in these cases,
     * but bidirectional a* is much faster. Currently it does not update
     * the time (and speeds) when searching for the route path,
     * but the ETA on that route is recalculated based on the time-dependent speeds
     */
    prioritize_bidirectional?: bool;
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

export interface LatLng {
    lat: number;
    lon: number;
    time?: number;
    type?: LocationType;
}

export type OtherFilterKeys =
    | 'osm_changeset'
    | 'shape'
    | 'admin.country_code'
    | 'admin.country_text'
    | 'admin.state_code'
    | 'admin.state_text'
    | 'matched.point'
    | 'matched.type'
    | 'matched.edge_index'
    | 'matched.begin_route_discontinuity'
    | 'matched.end_route_discontinuity'
    | 'matched.distance_along_edge'
    | 'matched.distance_from_trace_point';

export type NodeFilterKeys =
    | 'node.intersecting_edge.begin_heading'
    | 'node.intersecting_edge.from_edge_name_consistency'
    | 'node.intersecting_edge.to_edge_name_consistency'
    | 'node.intersecting_edge.driveability'
    | 'node.intersecting_edge.cyclability'
    | 'node.intersecting_edge.walkability'
    | 'node.intersecting_edge.use'
    | 'node.intersecting_edge.road_class'
    | 'node.intersecting_edge.lane_count'
    | 'node.elapsed_time'
    | 'node.admin_index'
    | 'node.type'
    | 'node.fork'
    | 'node.time_zone';

export type EdgeFilterKeys =
    | 'edge.names'
    | 'edge.length'
    | 'edge.speed'
    | 'edge.road_class'
    | 'edge.begin_heading'
    | 'edge.end_heading'
    | 'edge.begin_shape_index'
    | 'edge.end_shape_index'
    | 'edge.traversability'
    | 'edge.use'
    | 'edge.toll'
    | 'edge.unpaved'
    | 'edge.tunnel'
    | 'edge.bridge'
    | 'edge.roundabout'
    | 'edge.internal_intersection'
    | 'edge.drive_on_right'
    | 'edge.surface'
    | 'edge.sign.exit_number'
    | 'edge.sign.exit_branch'
    | 'edge.sign.exit_toward'
    | 'edge.sign.exit_name'
    | 'edge.travel_mode'
    | 'edge.vehicle_type'
    | 'edge.pedestrian_type'
    | 'edge.bicycle_type'
    | 'edge.transit_type'
    | 'edge.id'
    | 'edge.indoor'
    | 'edge.way_id'
    | 'edge.weighted_grade'
    | 'edge.max_upward_grade'
    | 'edge.max_downward_grade'
    | 'edge.mean_elevation'
    | 'edge.lane_count'
    | 'edge.cycle_lane'
    | 'edge.bicycle_network'
    | 'edge.sac_scale'
    | 'edge.shoulder'
    | 'edge.sidewalk'
    | 'edge.density'
    | 'edge.speed_limit'
    | 'edge.truck_speed'
    | 'edge.truck_route';

export interface TraceAttributesFilter {
    attributes: (NodeFilterKeys | EdgeFilterKeys | OtherFilterKeys)[];
    action: 'include' | 'exclude';
}

export interface TraceOptions {
    turn_penalty_factor?: number;
    /*
     * Search radius in meters associated with supplied trace points.
     */
    search_radius?: number[];
    /*
     * GPS accuracy in meters associated with supplied trace points.
     */
    gps_accuracy?: number[];
    /*
     * Breaking distance in meters between trace points.
     */
    breakage_distance?: number;
    /*
     * Interpolation distance in meters beyond which trace points are merged together.
     */
    interpolation_distance?: number;
}

export type ShapeMatchType = 'edge_walk' | 'map_snap' | 'walk_or_snap';

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

export interface ErrorResponse {
    /*
     * for detailed run-down see
     * [here](https://valhalla.github.io/valhalla/api/turn-by-turn/api-reference/#http-status-codes-and-conditions)
     */
    status: string;
    status_message: string;
    error_code?: string;
    error?: string;
}

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

export interface BaseLeg {
    summary: Summary;
    shape: string;
}

export interface LegWithManeuvers<T extends Maneuver = Maneuver>
    extends BaseLeg {
    maneuvers: T[];
}

export interface Trip<T extends BaseLeg> {
    locations: Location[];
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

export interface TripResponse<T extends BaseLeg = BaseLeg> {
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

export type MapMatchingTraceRouteResponse<T extends BaseLeg> = TripResponse<T>;

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
