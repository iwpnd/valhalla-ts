import { decodePolyline, polylineToLineString } from './decode-polyline';

describe('decodePolyline', () => {
    it('should decode polyline', () => {
        const polyline = 'adi`cBk|inXhXjL`QnHpMfFjm@hV';
        const expectedCoordinates = [
            [13.35855, 52.450385],
            [13.358336, 52.44998],
            [13.358184, 52.449691],
            [13.358068, 52.449458],
            [13.357695, 52.448716],
        ];
        expect(decodePolyline(polyline, 6)).toEqual(expectedCoordinates);
        expect(polylineToLineString(polyline, 6)).toEqual({
            type: 'LineString',
            coordinates: expectedCoordinates,
        });
    });

    it('should decode polyline google example', () => {
        const expectedCoordinates = [
            [-120.2, 38.5],
            [-120.95, 40.7],
            [-126.453, 43.252],
        ];

        const polyline = '_p~iF~ps|U_ulLnnqC_mqNvxq`@';

        expect(decodePolyline(polyline, 5)).toEqual(expectedCoordinates);
        expect(polylineToLineString(polyline, 5)).toEqual({
            type: 'LineString',
            coordinates: expectedCoordinates,
        });
    });
});
