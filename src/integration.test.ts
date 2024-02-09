import {
    CostingModels,
    Leg,
    LegWithManeuvers,
    Trip,
    TurnByTurnRouteRequest,
} from './types';
import { Valhalla } from './valhalla';

describe('integration', () => {
    const valhalla = new Valhalla();

    describe('route', () => {
        it('should request a route with maneuvers for %s', async () => {
            const start = { lat: 42.530607, lon: 1.570593 };
            const end = { lat: 42.534826, lon: 1.579133 };
            const costing = 'bicycle';

            const request: TurnByTurnRouteRequest = {
                locations: [start, end],
                costing,
                directions_type: 'maneuvers',
                directions_options: {
                    units: 'kilometers',
                },
            };

            const response = await valhalla.route<LegWithManeuvers>(request);

            expect(response).toEqual({
                status_message: 'Found route between points',
                status: 0,
                units: 'kilometers',
                language: 'en-US',
                legs: [
                    {
                        maneuvers: expect.arrayContaining([
                            {
                                begin_shape_index: expect.any(Number) as Number,
                                cost: expect.any(Number) as Number,
                                end_shape_index: expect.any(Number) as Number,
                                instruction: expect.any(String) as String,
                                length: expect.any(Number) as Number,
                                street_names: expect.any(
                                    Array<String>
                                ) as Array<String>,
                                time: expect.any(Number) as Number,
                                travel_mode: costing,
                                travel_type: expect.any(String) as String,
                                type: expect.any(Number) as Number,
                            },
                        ]) as Array<Object>,
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
                locations: [
                    { ...start, type: 'break', original_index: 0 },
                    { ...end, type: 'break', original_index: 1 },
                ],
            } as Trip<LegWithManeuvers>);
        });

        it.each([
            'bicycle',
            'car',
            'pedestrian',
            'truck',
            'bus',
        ] as CostingModels[])('should request a route for %s', async () => {
            const start = { lat: 42.530607, lon: 1.570593 };
            const end = { lat: 42.534826, lon: 1.579133 };

            const request: TurnByTurnRouteRequest = {
                locations: [start, end],
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
            } as Trip<Leg>);
        });
    });
});
