import { MockAgent, setGlobalDispatcher } from 'undici';
import { RequestError } from './client';
import {
    IsochroneResponse,
    IsochroneTimeRequest,
    OptimizedRouteRequest,
    TripResponse,
    TurnByTurnRouteRequest,
} from './types';
import { Valhalla } from './valhalla';

const mockAgent = new MockAgent({ connections: 1 });

setGlobalDispatcher(mockAgent);
mockAgent.disableNetConnect();

describe('valhalla', () => {
    const url = 'http://localhost:3000';
    const valhalla = new Valhalla(url);

    const mockPool = mockAgent.get(url);

    describe('status', () => {
        it('should request status with verbose=true', async () => {
            const status = {
                version: '3.3.0',
                tileset_last_modified: 1674302817,
            };

            mockPool
                .intercept({
                    path: '/status?verbose=true',
                    method: 'GET',
                    headers: { Accept: 'application/json' },
                })
                .defaultReplyHeaders({
                    'Content-Type': 'application/json',
                })
                .reply(200, status);

            await expect(valhalla.status(true)).resolves.toEqual(status);
        });

        it('should throw on error', async () => {
            mockPool
                .intercept({
                    path: '/status',
                    method: 'GET',
                    headers: { Accept: 'application/json' },
                })
                .defaultReplyHeaders({
                    'Content-Type': 'application/json',
                })
                .reply(404, {});

            await expect(valhalla.status()).rejects.toThrow(RequestError);
        });
    });

    describe('route', () => {
        const req: TurnByTurnRouteRequest = {
            costing: 'bicycle',
            directions_type: 'none',
            directions_options: {
                units: 'kilometers',
            },
            locations: [
                {
                    lat: 1,
                    lon: 1,
                },
                {
                    lat: 2,
                    lon: 2,
                },
            ],
        };

        it('should request a route', async () => {
            const resp: TripResponse = {
                trip: {
                    locations: req.locations,
                    legs: [
                        {
                            shape: '',
                            summary: {
                                has_time_restrictions: false,
                                min_lat: 1,
                                min_lon: 1,
                                max_lat: 2,
                                max_lon: 2,
                                time: 1337,
                                length: 1337,
                                cost: 10,
                            },
                        },
                    ],
                    summary: {
                        has_time_restrictions: false,
                        min_lat: 1,
                        min_lon: 1,
                        max_lat: 2,
                        max_lon: 2,
                        time: 1337,
                        length: 1337,
                        cost: 10,
                    },
                    status_message: 'works, hu',
                    status: 200,
                    units: 'kilometers',
                    language: 'en-US',
                },
            };

            mockPool
                .intercept({
                    path: '/route',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(req),
                })
                .defaultReplyHeaders({
                    'Content-Type': 'application/json',
                })
                .reply(200, resp);

            await expect(valhalla.route(req)).resolves.toEqual(resp);
        });

        it('should throw on error', async () => {
            mockPool
                .intercept({
                    path: '/route',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(req),
                })
                .defaultReplyHeaders({
                    'Content-Type': 'application/json',
                })
                .reply(404, {});

            await expect(valhalla.route(req)).rejects.toThrow(RequestError);
        });
    });

    describe('optimizedRoute', () => {
        const req: OptimizedRouteRequest = {
            costing: 'bicycle',
            directions_type: 'none',
            directions_options: {
                units: 'kilometers',
            },
            locations: [
                {
                    lat: 1,
                    lon: 1,
                },
                {
                    lat: 2,
                    lon: 2,
                },
            ],
        };

        it('should request optimized route', async () => {
            const resp: TripResponse = {
                trip: {
                    locations: req.locations,
                    legs: [
                        {
                            shape: '',
                            summary: {
                                has_time_restrictions: false,
                                min_lat: 1,
                                min_lon: 1,
                                max_lat: 2,
                                max_lon: 2,
                                time: 1337,
                                length: 1337,
                                cost: 10,
                            },
                        },
                    ],
                    summary: {
                        has_time_restrictions: false,
                        min_lat: 1,
                        min_lon: 1,
                        max_lat: 2,
                        max_lon: 2,
                        time: 1337,
                        length: 1337,
                        cost: 10,
                    },
                    status_message: 'works, hu',
                    status: 200,
                    units: 'kilometers',
                    language: 'en-US',
                },
            };

            mockPool
                .intercept({
                    path: '/optimized_route',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(req),
                })
                .defaultReplyHeaders({
                    'Content-Type': 'application/json',
                })
                .reply(200, resp);

            await expect(valhalla.optimizedRoute(req)).resolves.toEqual(resp);
        });

        it('should throw on error', async () => {
            mockPool
                .intercept({
                    path: '/optimized_route',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(req),
                })
                .defaultReplyHeaders({
                    'Content-Type': 'application/json',
                })
                .reply(404, {});

            await expect(valhalla.optimizedRoute(req)).rejects.toThrow(
                RequestError
            );
        });
    });

    describe('isochrone', () => {
        const req: IsochroneTimeRequest = {
            locations: [{ lat: 1, lon: 1 }],
            costing: 'bicycle',
            contours: [{ time: 5, color: '000000' }],
            polygons: true,
        };

        it('should an isochrone', async () => {
            const resp: IsochroneResponse = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {
                            color: '000',
                            fill: '000',
                            'fill-opacity': 0.2,
                            fillOpacity: 0.2,
                            fillColor: '000',
                            contour: 1,
                            opacity: 1,
                            metric: 'time',
                        },
                        geometry: {
                            type: 'Polygon',
                            coordinates: [
                                [
                                    [0.37144824643809216, 1.4123630083700789],
                                    [0.3622670435941586, 0.72389619231609],
                                    [1.023314033657158, 0.21894846839975912],
                                    [2.079152976118394, 0.46683645714260535],
                                    [1.7761731056729673, 1.5500350826305436],
                                    [1.3446563204933284, 2.2382453061725442],
                                    [0.37144824643809216, 1.4123630083700789],
                                ],
                            ],
                        },
                    },
                ],
            };
            mockPool
                .intercept({
                    path: '/isochrone',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(req),
                })
                .defaultReplyHeaders({
                    'Content-Type': 'application/json',
                })
                .reply(200, resp);

            await expect(valhalla.isochrone(req)).resolves.toEqual(resp);
        });

        it('should throw on error', async () => {
            mockPool
                .intercept({
                    path: '/isochrone',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(req),
                })
                .defaultReplyHeaders({
                    'Content-Type': 'application/json',
                })
                .reply(404, {});

            await expect(valhalla.isochrone(req)).rejects.toThrow(RequestError);
        });
    });
});
