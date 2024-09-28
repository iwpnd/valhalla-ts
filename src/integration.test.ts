import {
    CostingModels,
    LegWithManeuvers,
    Trip,
    TurnByTurnRouteRequest,
} from './types';
import { Valhalla } from './valhalla';

describe('integration', () => {
    const valhalla = new Valhalla();

    describe('route', () => {
        it('should request a route with maneuvers', async () => {
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
                                begin_shape_index: expect.any(Number) as number,
                                cost: expect.any(Number) as number,
                                end_shape_index: expect.any(Number) as number,
                                instruction: expect.any(String) as string,
                                length: expect.any(Number) as number,
                                street_names: expect.any(
                                    Array<string>
                                ) as string[],
                                time: expect.any(Number) as number,
                                travel_mode: costing,
                                travel_type: expect.any(String) as string,
                                type: expect.any(Number) as number,
                            },
                        ]) as object[],
                        summary: {
                            has_time_restrictions: expect.any(
                                Boolean
                            ) as boolean,
                            has_toll: expect.any(Boolean) as boolean,
                            has_highway: expect.any(Boolean) as boolean,
                            has_ferry: expect.any(Boolean) as boolean,
                            min_lat: expect.any(Number) as number,
                            min_lon: expect.any(Number) as number,
                            max_lat: expect.any(Number) as number,
                            max_lon: expect.any(Number) as number,
                            time: expect.any(Number) as number,
                            length: expect.any(Number) as number,
                            cost: expect.any(Number) as number,
                        },
                        shape: expect.any(String) as string,
                    },
                ],
                summary: {
                    has_time_restrictions: expect.any(Boolean) as boolean,
                    has_toll: expect.any(Boolean) as boolean,
                    has_highway: expect.any(Boolean) as boolean,
                    has_ferry: expect.any(Boolean) as boolean,
                    min_lat: expect.any(Number) as number,
                    min_lon: expect.any(Number) as number,
                    max_lat: expect.any(Number) as number,
                    max_lon: expect.any(Number) as number,
                    time: expect.any(Number) as number,
                    length: expect.any(Number) as number,
                    cost: expect.any(Number) as number,
                },
                locations: [
                    { ...start, type: 'break', original_index: 0 },
                    { ...end, type: 'break', original_index: 1 },
                ],
            } as Trip<LegWithManeuvers>);
        });

        it.each([
            'bicycle',
            'pedestrian',
            'auto',
            'truck',
            'bus',
        ] as CostingModels[])(
            'should request a route for %s',
            async (costing) => {
                const start = { lat: 42.530607, lon: 1.570593 };
                const end = { lat: 42.534826, lon: 1.579133 };

                const request: TurnByTurnRouteRequest = {
                    locations: [start, end],
                    costing,
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
                                ) as boolean,
                                has_toll: expect.any(Boolean) as boolean,
                                has_highway: expect.any(Boolean) as boolean,
                                has_ferry: expect.any(Boolean) as boolean,
                                min_lat: expect.any(Number) as number,
                                min_lon: expect.any(Number) as number,
                                max_lat: expect.any(Number) as number,
                                max_lon: expect.any(Number) as number,
                                time: expect.any(Number) as number,
                                length: expect.any(Number) as number,
                                cost: expect.any(Number) as number,
                            },
                            shape: expect.any(String) as string,
                        },
                    ],
                    summary: {
                        has_time_restrictions: expect.any(Boolean) as boolean,
                        has_toll: expect.any(Boolean) as boolean,
                        has_highway: expect.any(Boolean) as boolean,
                        has_ferry: expect.any(Boolean) as boolean,
                        min_lat: expect.any(Number) as number,
                        min_lon: expect.any(Number) as number,
                        max_lat: expect.any(Number) as number,
                        max_lon: expect.any(Number) as number,
                        time: expect.any(Number) as number,
                        length: expect.any(Number) as number,
                        cost: expect.any(Number) as number,
                    },
                } as Trip);
            }
        );
    });

    describe('optimizedRoute', () => {
        it('should request an optmized route with maneuvers', async () => {
            const start = { lat: 42.530607, lon: 1.570593 };
            const stop = { lat: 42.534943, lon: 1.572731 };
            const end = { lat: 42.534826, lon: 1.579133 };
            const costing = 'bicycle';

            const request: TurnByTurnRouteRequest = {
                locations: [start, stop, end],
                costing,
                directions_type: 'maneuvers',
                directions_options: {
                    units: 'kilometers',
                },
            };

            const response = await valhalla.route<LegWithManeuvers>(request);

            expect(response.legs).toHaveLength(2);
            expect(response).toEqual({
                status_message: 'Found route between points',
                status: 0,
                units: 'kilometers',
                language: 'en-US',
                legs: [
                    {
                        maneuvers: expect.arrayContaining([
                            {
                                begin_shape_index: expect.any(Number) as number,
                                cost: expect.any(Number) as number,
                                end_shape_index: expect.any(Number) as number,
                                instruction: expect.any(String) as string,
                                length: expect.any(Number) as number,
                                street_names: expect.any(
                                    Array<string>
                                ) as string[],
                                time: expect.any(Number) as number,
                                travel_mode: costing,
                                travel_type: expect.any(String) as string,
                                type: expect.any(Number) as number,
                            },
                        ]) as object[],
                        summary: {
                            has_time_restrictions: expect.any(
                                Boolean
                            ) as boolean,
                            has_toll: expect.any(Boolean) as boolean,
                            has_highway: expect.any(Boolean) as boolean,
                            has_ferry: expect.any(Boolean) as boolean,
                            min_lat: expect.any(Number) as number,
                            min_lon: expect.any(Number) as number,
                            max_lat: expect.any(Number) as number,
                            max_lon: expect.any(Number) as number,
                            time: expect.any(Number) as number,
                            length: expect.any(Number) as number,
                            cost: expect.any(Number) as number,
                        },
                        shape: expect.any(String) as string,
                    },
                    {
                        maneuvers: expect.arrayContaining([
                            {
                                begin_shape_index: expect.any(Number) as number,
                                cost: expect.any(Number) as number,
                                end_shape_index: expect.any(Number) as number,
                                instruction: expect.any(String) as string,
                                length: expect.any(Number) as number,
                                street_names: expect.any(
                                    Array<string>
                                ) as string[],
                                time: expect.any(Number) as number,
                                travel_mode: costing,
                                travel_type: expect.any(String) as string,
                                type: expect.any(Number) as number,
                            },
                        ]) as object[],
                        summary: {
                            has_time_restrictions: expect.any(
                                Boolean
                            ) as boolean,
                            has_toll: expect.any(Boolean) as boolean,
                            has_highway: expect.any(Boolean) as boolean,
                            has_ferry: expect.any(Boolean) as boolean,
                            min_lat: expect.any(Number) as number,
                            min_lon: expect.any(Number) as number,
                            max_lat: expect.any(Number) as number,
                            max_lon: expect.any(Number) as number,
                            time: expect.any(Number) as number,
                            length: expect.any(Number) as number,
                            cost: expect.any(Number) as number,
                        },
                        shape: expect.any(String) as string,
                    },
                ],
                summary: {
                    has_time_restrictions: expect.any(Boolean) as boolean,
                    has_toll: expect.any(Boolean) as boolean,
                    has_highway: expect.any(Boolean) as boolean,
                    has_ferry: expect.any(Boolean) as boolean,
                    min_lat: expect.any(Number) as number,
                    min_lon: expect.any(Number) as number,
                    max_lat: expect.any(Number) as number,
                    max_lon: expect.any(Number) as number,
                    time: expect.any(Number) as number,
                    length: expect.any(Number) as number,
                    cost: expect.any(Number) as number,
                },
                locations: [
                    { ...start, type: 'break', original_index: 0 },
                    { ...stop, type: 'break', original_index: 1 },
                    { ...end, type: 'break', original_index: 2 },
                ],
            } as Trip<LegWithManeuvers>);
        });

        it.each([
            'bicycle',
            'pedestrian',
            'auto',
            'truck',
            'bus',
        ] as CostingModels[])(
            'should request a route for %s',
            async (costing) => {
                const start = { lat: 42.530607, lon: 1.570593 };
                const stop = { lat: 42.534943, lon: 1.572731 };
                const end = { lat: 42.534826, lon: 1.579133 };

                const request: TurnByTurnRouteRequest = {
                    locations: [start, stop, end],
                    costing,
                    directions_type: 'none',
                    directions_options: {
                        units: 'kilometers',
                    },
                };

                const response = await valhalla.route(request);
                expect(response.legs).toHaveLength(2);
                expect(response).toEqual({
                    locations: [
                        { ...start, type: 'break', original_index: 0 },
                        { ...stop, type: 'break', original_index: 1 },
                        { ...end, type: 'break', original_index: 2 },
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
                                ) as boolean,
                                has_toll: expect.any(Boolean) as boolean,
                                has_highway: expect.any(Boolean) as boolean,
                                has_ferry: expect.any(Boolean) as boolean,
                                min_lat: expect.any(Number) as number,
                                min_lon: expect.any(Number) as number,
                                max_lat: expect.any(Number) as number,
                                max_lon: expect.any(Number) as number,
                                time: expect.any(Number) as number,
                                length: expect.any(Number) as number,
                                cost: expect.any(Number) as number,
                            },
                            shape: expect.any(String) as string,
                        },
                        {
                            summary: {
                                has_time_restrictions: expect.any(
                                    Boolean
                                ) as boolean,
                                has_toll: expect.any(Boolean) as boolean,
                                has_highway: expect.any(Boolean) as boolean,
                                has_ferry: expect.any(Boolean) as boolean,
                                min_lat: expect.any(Number) as number,
                                min_lon: expect.any(Number) as number,
                                max_lat: expect.any(Number) as number,
                                max_lon: expect.any(Number) as number,
                                time: expect.any(Number) as number,
                                length: expect.any(Number) as number,
                                cost: expect.any(Number) as number,
                            },
                            shape: expect.any(String) as string,
                        },
                    ],
                    summary: {
                        has_time_restrictions: expect.any(Boolean) as boolean,
                        has_toll: expect.any(Boolean) as boolean,
                        has_highway: expect.any(Boolean) as boolean,
                        has_ferry: expect.any(Boolean) as boolean,
                        min_lat: expect.any(Number) as number,
                        min_lon: expect.any(Number) as number,
                        max_lat: expect.any(Number) as number,
                        max_lon: expect.any(Number) as number,
                        time: expect.any(Number) as number,
                        length: expect.any(Number) as number,
                        cost: expect.any(Number) as number,
                    },
                } as Trip);
            }
        );
    });
});
