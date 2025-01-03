/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */

import Chance from 'chance';
import type * as GeoJSON from 'geojson';

import {
    Isochrone,
    IsochroneResponseProperties,
    Position,
    RequestLocation,
    ResponseLocation,
    StatusResponse,
    Summary,
    Trip,
} from '../types';

const chance = new Chance();

/**
 *
 * Create a status
 * @params data? { Partial<StatusResponse>}
 *
 * returns {@link StatusResponse}
 */
export const randomStatus = <T extends StatusResponse = StatusResponse>(
    extended = false
): T =>
    ({
        version: chance.string(),
        tileset_last_modfied: chance.timestamp(),
        ...(extended && {
            has_admin: chance.bool(),
            has_tiles: chance.bool(),
            has_timezones: chance.bool(),
            has_live_traffic: chance.bool(),
            bbox: [
                chance.floating({ min: 0, max: 90 }),
                chance.floating({ min: 0, max: 45 }),
                chance.floating({ min: 90, max: 180 }),
                chance.floating({ min: 45, max: 90 }),
            ],
        }),
    }) as T;

/**
 *
 * Create a random position of latitude and longitude
 *
 * @remarks
 * Position is created between
 * in a bounding box of[-180,-90,180,90]
 *
 * @params lat? - latitude
 * @params lon? - longitude
 *
 * returns {@link Position}
 */
export const randomPosition = (lat?: number, lon?: number): Position => ({
    lat: lat ?? chance.floating({ min: -90, max: 90 }),
    lon: lon ?? chance.floating({ min: -180, max: 180 }),
});

/**
 *
 * Create a random location
 *
 * @remarks
 * Location is created between
 * in a bounding box of[-180,-90,180,90]
 *
 * @params data? { Partial<RequestLocation>}
 *
 * returns {@link RequestPosition}
 */
export const randomRequestLocation = (
    data?: Partial<RequestLocation>
): RequestLocation => ({
    ...randomPosition(),
    ...data,
});

/**
 *
 * Create a random polygon
 *
 * @remarks
 * polygon is created between
 * in a bounding box of [13.1632, 52.4099, 13.6402, 52.6353]
 *
 * @params bbox {BBox}
 *
 * returns {@link Polygon}
 */
export const randomPolygon = (
    bbox = [13.1632, 52.4099, 13.6402, 52.6353]
): GeoJSON.Polygon => {
    const N = 5;
    const [minLng, minLat, maxLng, maxLat] = bbox;

    const points = [...Array(N).keys()].map(() => [
        chance.floating({ min: minLng, max: maxLng }),
        chance.floating({ min: minLat, max: maxLat }),
    ]);

    let sw: number[] = [];
    let ne: number[] = [];

    points.forEach(([lng, lat]) => {
        if (!sw.length) {
            sw = [lng, lat];
        }

        if (!ne.length) {
            ne = [lng, lat];
        }

        if (sw[0] > lng) {
            sw[0] = lng;
        }

        if (sw[1] > lat) {
            sw[1] = lat;
        }

        if (ne[0] < lng) {
            ne[0] = lng;
        }

        if (ne[1] < lat) {
            ne[1] = lat;
        }
    });

    return {
        type: 'Polygon',
        coordinates: [[sw, [ne[0], sw[1]], ne, [sw[0], ne[1]], sw]],
    };
};

/**
 *
 * Create random isochrone properties
 *
 * @return {@link IsochroneResponseProperties}
 */
export const randomIsochroneProperties = (): IsochroneResponseProperties => ({
    fill: chance.color(),
    fillColor: chance.color(),
    color: chance.color(),
    fillOpacity: chance.floating({ min: 0, max: 1 }),
    'fill-opacity': chance.floating({ min: 0, max: 1 }),
    opacity: chance.floating({ min: 0, max: 1 }),
    contour: chance.integer({ min: 5, max: 20 }),
    metric: 'time',
});

/**
 *
 * Create random isochrone
 *
 * @params {@link Partial<@link Isochrone>}
 *
 * @return {@link Isochrone}
 */
export const randomIsochrone = (data?: Partial<Isochrone>): Isochrone => ({
    type: 'Feature',
    geometry: randomPolygon(),
    properties: randomIsochroneProperties(),
    ...data,
});

/**
 *
 * Create random route summary
 *
 * @params {@link Partial<@link Summary>}
 *
 * @return {@link summary}
 */
export const randomSummary = (data?: Partial<Summary>): Summary => ({
    has_time_restrictions: false,
    min_lat: chance.floating({ min: -90, max: 90 }),
    min_lon: chance.floating({ min: -180, max: 180 }),
    max_lat: chance.floating({ min: -90, max: 90 }),
    max_lon: chance.floating({ min: -180, max: 180 }),
    time: chance.floating({ min: 100.0, max: 1000.0 }),
    length: chance.floating({ min: 100.0, max: 1000.0 }),
    cost: chance.floating({ min: 100.0, max: 1000.0 }),
    ...data,
});

/**
 *
 * Create random route
 *
 * @params {@link Partial<@link Trip>}
 *
 * @return {@link Trip}
 */
export const randomTrip = (data?: Partial<Trip>): Trip => ({
    locations: [
        { ...randomPosition(), original_index: 0 },
        { ...randomPosition(), original_index: 1 },
    ] as ResponseLocation[],
    legs: [
        {
            shape: 'adi`cBk|inXhXjL`QnHpMfFjm@hV',
            summary: randomSummary(),
        },
    ],
    summary: randomSummary(),
    status_message: chance.string(),
    status: chance.integer(),
    units: 'kilometers',
    language: 'en-US',
    ...data,
});
