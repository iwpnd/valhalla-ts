export type TracingOtherFilterKeys =
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

export type TracingNodeFilterKeys =
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

export type TracingEdgeFilterKeys =
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
    attributes: (
        | TracingNodeFilterKeys
        | TracingEdgeFilterKeys
        | TracingOtherFilterKeys
    )[];
    action: 'include' | 'exclude';
}

export interface TraceOptions {
    turn_penalty_factor?: number;
    /**
     * Search radius in meters associated with supplied trace points.
     */
    search_radius?: number[];
    /**
     * GPS accuracy in meters associated with supplied trace points.
     */
    gps_accuracy?: number[];
    /**
     * Breaking distance in meters between trace points.
     */
    breakage_distance?: number;
    /**
     * Interpolation distance in meters beyond which trace points are merged together.
     */
    interpolation_distance?: number;
}
