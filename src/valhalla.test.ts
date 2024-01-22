import { MockAgent, setGlobalDispatcher } from 'undici';
import { randomIsochrone, randomStatus, randomTrip } from './__fixtures__';
import { RequestError } from './client';
import {
    IsochroneResponse,
    IsochroneTimeRequest,
    ManeuverType,
    MapMatchingShapeRequest,
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

    describe('make jest coverage happy', () => {
        const maneuvertype = ManeuverType.kLeft;
        expect(maneuvertype).toEqual(15);
    });

    describe('status', () => {
        it('should request status with verbose=true', async () => {
            const status = randomStatus();

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
        const trip = randomTrip();
        const {
            locations: [start, end],
        } = trip;

        const req: TurnByTurnRouteRequest = {
            costing: 'bicycle',
            directions_type: 'none',
            directions_options: {
                units: 'kilometers',
            },
            locations: [start, end],
        };

        it('should request a route', async () => {
            const resp: TripResponse = {
                trip,
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
        const trip = randomTrip();
        const {
            locations: [start, end],
        } = trip;

        const req: OptimizedRouteRequest = {
            costing: 'bicycle',
            directions_type: 'none',
            directions_options: {
                units: 'kilometers',
            },
            locations: [start, end],
        };

        it('should request optimized route', async () => {
            const resp: TripResponse = {
                trip,
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
        const isochrone = randomIsochrone();

        const req: IsochroneTimeRequest = {
            locations: [{ lat: 1, lon: 1 }],
            costing: 'bicycle',
            contours: [{ time: 5, color: '000000' }],
            polygons: true,
        };

        it('should an isochrone', async () => {
            const resp: IsochroneResponse = {
                type: 'FeatureCollection',
                features: [isochrone],
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

    describe('mapmatching', () => {
        const trip = randomTrip();
        const {
            locations: [start, end],
        } = trip;

        const req: MapMatchingShapeRequest = {
            shape: [start, end],
            shape_match: 'map_snap',
            costing: 'bicycle',
            directions_type: 'none',
            directions_options: {
                units: 'kilometers',
            },
        };

        it('should request trace route', async () => {
            mockPool
                .intercept({
                    path: '/trace_route',
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
                .reply(200, { trip });

            await expect(valhalla.mapmatching(req)).resolves.toEqual({ trip });
        });

        it('should throw on error', async () => {
            mockPool
                .intercept({
                    path: '/trace_route',
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

            await expect(valhalla.mapmatching(req)).rejects.toThrow(
                RequestError
            );
        });
    });
});
