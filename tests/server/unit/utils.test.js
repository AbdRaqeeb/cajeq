import {getDifferenceInDays} from "../../../utils/date.js";
import {generateReference} from "../../../utils/reference.js";

describe('Utils functions', () => {
    describe('Get Number of Days', () => {
        it('should return the number of days between two dates', () => {
            const date1 = new Date('2020-12-13');
            const date2 = new Date('2020-12-15');

            const result = getDifferenceInDays(date1, date2);

            expect(result).toBe(2);
        });
    });

    describe('Genereate Random Reference', () => {
        it('should return a random reference string', () => {
            const result = generateReference(6);

            expect(result).toContain('-');
            expect(result).toContain('2020');
        })
    });
});