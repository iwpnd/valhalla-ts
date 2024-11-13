import { RequestOptions, RestClient } from '@iwpnd/rip-ts';

import {
    ExtendedStatusResponse,
    IsochroneDistanceRequest,
    IsochroneResponse,
    IsochroneTimeRequest,
    Leg,
    MapMatchingPolylineRequest,
    MapMatchingShapeRequest,
    MapMatchingTraceRouteResponse,
    OptimizedRouteRequest,
    StatusResponse,
    Trip,
    TripResponse,
    TurnByTurnRouteRequest,
} from './types';

export class Valhalla extends RestClient {
    constructor(url?: string, options?: RequestOptions) {
        const uri = url ?? process.env.VALHALLA_URL;

        if (!uri) {
            throw Error('valhalla url is required');
        }

        super(uri, {
            ...options,
            headers: {
                Accept: 'application/json',
                ...options?.headers,
            },
        });
    }

    /**
     *
     * Get a turn by turn route
     *
     * @public
     * @remarks
     * Returns a turn by turn route based on
     * the input {@link TurnByTurnRouteRequest}
     *
     * @param query - {@link TurnByTurnRouteRequest}
     *
     * @returns {@link Trip}
     */
    async route<T extends Leg = Leg>(
        query: TurnByTurnRouteRequest
    ): Promise<Trip<T>> {
        const options = {
            method: 'POST',
            body: query,
        };

        const { trip } = await this.request<TripResponse<T>>('/route', options);
        return trip;
    }

    /**
     *
     * Get an optimized route
     *
     * @public
     * @remarks
     * Get an optimized route, a route between two or more locations,
     * based on the input {@link OptimizedRouteRequest}.
     *
     * @param query - {@link OptimizedRouteRequest}
     *
     * @returns {@link TripResponse}
     */
    async optimizedRoute<T extends Leg>(
        query: OptimizedRouteRequest
    ): Promise<TripResponse<T>> {
        const options = {
            method: 'POST',
            body: query,
        };

        return this.request<TripResponse<T>>('/optimized_route', options);
    }

    /**
     *
     * Get one or more Isochrone(s) around an input location.
     *
     * @public
     * @remarks
     * Get one or more Isochrones based on the input {@link IsochroneRouteRequest}.
     *
     * @param query - {@link IsochroneRouteRequest}
     *
     * @returns {@link IsochroneResponse}
     */
    async isochrone(
        query: IsochroneTimeRequest | IsochroneDistanceRequest
    ): Promise<IsochroneResponse> {
        const options = {
            method: 'POST',
            body: query,
        };

        return this.request<IsochroneResponse>('/isochrone', options);
    }

    /**
     *
     * Mapmatch an input route to the road network
     *
     * @public
     * @remarks
     * Match an input route to the road network,
     * based on the input {@link MapMatchingShapeRequest} | {@MapMatchingPolylineRequest}.
     *
     * @param query - {@link MapMatchingShapeRequest} | {@link MapMatchingPolylineRequest}
     *
     * @returns {@link MapMatchingTraceRouteResponse}
     */
    async traceRoute<T extends Leg>(
        query: MapMatchingShapeRequest | MapMatchingPolylineRequest
    ): Promise<MapMatchingTraceRouteResponse<T>> {
        const options = {
            method: 'POST',
            body: query,
        };

        return this.request<MapMatchingTraceRouteResponse<T>>(
            '/trace_route',
            options
        );
    }

    /**
     *
     * Get the valhalla server status
     *
     * @public
     * @remarks
     * Get the valhalla service status,
     * If service_limits.status.allow_verbose is set to true, will also
     * return addtional information if verbose is set to true.
     *
     * @param verbose (boolean): default false
     *
     * @returns {@link StatusResponse} | {@link ExtendedStatusResponse}
     */
    async status(
        verbose = false
    ): Promise<StatusResponse | ExtendedStatusResponse> {
        return this.request('/status', {
            method: 'GET',
            ...(verbose && { query: { verbose: JSON.stringify(verbose) } }),
        });
    }
}
