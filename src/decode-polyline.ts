/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */

import type * as GeoJSON from 'geojson';

/**
 * Decode a valhalla shape to an array of {@link GeoJSON.Position}
 *
 * @param {String} shape
 * @param {Number} precision = 6
 * @returns {@link GeoJSON.Position[]}
 *
 * @see https://github.com/DennisOSRM/Project-OSRM-Web/blob/master/WebContent/routing/OSRM.RoutingGeometry.js
 */
export const decodePolyline = (
    shape: string,
    precision = 6
): GeoJSON.Position[] => {
    let index = 0;
    let lat = 0;
    let lng = 0;
    let result = 0;
    let shift = 0;
    let byte = null;
    let dLatitude: number;
    let dLongitude: number;

    const factor = 10 ** precision;
    const coordinates: GeoJSON.Position[] = [];

    while (index < shape.length) {
        byte = 0x20;
        shift = 0;
        result = 0;
        while (byte >= 0x20) {
            byte = shape.charCodeAt(index) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
            index++;
        }

        dLatitude = result & 1 ? ~(result >> 1) : result >> 1;

        byte = 0x20;
        shift = 0;
        result = 0;
        while (byte >= 0x20) {
            byte = shape.charCodeAt(index) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
            index++;
        }

        dLongitude = result & 1 ? ~(result >> 1) : result >> 1;

        lat += dLatitude;
        lng += dLongitude;

        coordinates.push([lng / factor, lat / factor]);
    }

    return coordinates;
};
