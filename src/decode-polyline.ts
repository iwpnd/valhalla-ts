/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */

import type * as GeoJSON from 'geojson';

/**
 * Decode a valhalla polyline to an array of {@link GeoJSON.Position}
 *
 * @param {String} polyline
 * @param {Number} precision = 6
 * @returns {@link GeoJSON.Position[]}
 *
 * @see https://github.com/DennisOSRM/Project-OSRM-Web/blob/master/WebContent/routing/OSRM.RoutingGeometry.js
 */
export const decodePolyline = (
    polyline: string,
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

    while (index < polyline.length) {
        byte = 0x20;
        shift = 0;
        result = 0;
        while (byte >= 0x20) {
            byte = polyline.charCodeAt(index) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
            index++;
        }

        dLatitude = result & 1 ? ~(result >> 1) : result >> 1;

        byte = 0x20;
        shift = 0;
        result = 0;
        while (byte >= 0x20) {
            byte = polyline.charCodeAt(index) - 63;
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

/**
 * Decode valhalla polyline shape to {@link GeoJSON.LineString}
 *
 * @param {String} polyline
 * @param {Number} precision
 *
 * @returns {GeoJSON.LineString}
 *
 */
export const polylineToLineString = (
    polyline: string,
    precision = 6
): GeoJSON.LineString => ({
    type: 'LineString',
    coordinates: decodePolyline(polyline, precision),
});
