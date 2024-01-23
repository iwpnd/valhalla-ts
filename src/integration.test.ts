import { Location, TurnByTurnRouteRequest } from './types';
import { Valhalla } from './valhalla';

describe('integration', () => {
    const valhalla = new Valhalla();

    describe('route', () => {
        it('should request a route', async () => {
            const locations: Location[] = [
                { lat: 42.530607, lon: 1.570593 },
                { lat: 42.534826, lon: 1.579133 },
            ];
            const [start, end] = locations;

            const request: TurnByTurnRouteRequest = {
                locations,
                costing: 'bicycle',
                directions_type: 'none',
                directions_options: {
                    units: 'kilometers',
                },
            };

            const response = await valhalla.route(request);
            expect(response).toEqual({
                locations: [
                    { ...start, type: 'break', original_index: 0 },
                    { ...end, type: 'break', original_index: 1 },
                ],
                status_message: 'Found route between points',
                status: 0,
                units: 'kilometers',
                language: 'en-US',
                legs: [
                    {
                        summary: {
                            has_time_restrictions: expect.any(
                                Boolean
                            ) as Boolean,
                            has_toll: expect.any(Boolean) as Boolean,
                            has_highway: expect.any(Boolean) as Boolean,
                            has_ferry: expect.any(Boolean) as Boolean,
                            min_lat: expect.any(Number) as Number,
                            min_lon: expect.any(Number) as Number,
                            max_lat: expect.any(Number) as Number,
                            max_lon: expect.any(Number) as Number,
                            time: expect.any(Number) as Number,
                            length: expect.any(Number) as Number,
                            cost: expect.any(Number) as Number,
                        },
                        shape: expect.any(String) as String,
                    },
                ],
                summary: {
                    has_time_restrictions: expect.any(Boolean) as Boolean,
                    has_toll: expect.any(Boolean) as Boolean,
                    has_highway: expect.any(Boolean) as Boolean,
                    has_ferry: expect.any(Boolean) as Boolean,
                    min_lat: expect.any(Number) as Number,
                    min_lon: expect.any(Number) as Number,
                    max_lat: expect.any(Number) as Number,
                    max_lon: expect.any(Number) as Number,
                    time: expect.any(Number) as Number,
                    length: expect.any(Number) as Number,
                    cost: expect.any(Number) as Number,
                },
            });
        });
    });
});
