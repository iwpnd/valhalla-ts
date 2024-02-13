import { StringBool } from './base';

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
    shortest?: StringBool;
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
    ignore_closures?: StringBool;
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
 * MotorizedVehicleCostingOptions are available for auto, bus, taxi
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
    exclude_cash_only_tolls?: StringBool;
    /*
     * A boolean value which indicates the desire to include HOV roads with a
     * 2-occupant requirement in the route when advantageous.
     *
     * Default false.
     */
    include_hov2?: StringBool;
    /*
     * A boolean value which indicates the desire to include HOV roads with a
     * 3-occupant requirement in the route when advantageous.
     *
     * Default false.
     */
    include_hov3?: StringBool;
    /*
     * A boolean value which indicates the desire to include tolled HOV roads
     * which require the driver to pay a toll if the occupant requirement isn't met.
     *
     * Default false.
     */
    include_hot?: StringBool;
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
    hazmat?: StringBool;
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
    shortest?: StringBool;
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
