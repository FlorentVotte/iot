/**
 * Created by Florent on 18/03/2020.
 */
const index = require('./index');
const HttpStatus = require('http-status-codes');

afterAll(() => {
    index.client.end();
});

let test1 = {'value': 3.0, 'unit': 'C', 'token': 'test'};

test('Test usual value', async () => {
    const status = await index.addValue(test1);
    expect(status).toBe(HttpStatus.ACCEPTED);
});

let test2 = {'value': 3, 'unit': 'C'};

test("Without sensor's token", async () => {
    const status = await index.addValue(test2);
    expect(status).toBe(HttpStatus.BAD_REQUEST);
});

let test3 = {'value': "3A", 'unit': 'C', 'token': 'test'};

test("With non float value", async () => {
    const status = await index.addValue(test3);
    expect(status).toBe(HttpStatus.BAD_REQUEST);
});
