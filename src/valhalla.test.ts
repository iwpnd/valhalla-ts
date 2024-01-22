import { MockAgent, setGlobalDispatcher } from 'undici';
import { RequestError } from './client';
import { TurnByTurnRouteRequest } from './types';
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
            const resp = {
                trip: {
                    locations: req.locations,
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
});
