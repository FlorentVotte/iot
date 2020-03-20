/**
 * Created by Florent on 18/03/2020.
 */
const index = require('./index');

let test1 = {'value': 3.0, 'unit': 'C', 'token': 'test'};

test('Test usual value', () => {
    index.addValue(test1, function (status) {
        expect(status).toBe(200);
    });
});

let test2 = {'value': 3, 'unit': 'C'};

test("Without sensor's token", () => {
    index.addValue(test2, function (status) {
        expect(status).toBe(400);
    });
});

let test3 = {'value': "3A", 'unit': 'C', 'token': 'test'};

test("With non float value", () => {
    index.addValue(test3, function (status) {
        expect(status).toBe(400);
    });
});