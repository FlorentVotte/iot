const express = require("express");
const { getDB } = require("../db/index.js");
const router = express.Router();
const HttpStatus = require('http-status-codes');
const jwt           = require('express-jwt');
const client = getDB();

router.get("/", (req, res, next) => {
    res.send({ hello: "Hello World!" });
});

router.post("/value", async (req, res, next) => {
    const status = await addValue(req.body);
    res.sendStatus(status);
});

router.get("/values", async (req, res, next) => {
    const sensorid = String(req.query.sensor);
    const size = String(req.query.size);
    const values = await getValues(sensorid, size);
    res.send(values);
});

router.get("/sensors", async (req, res, next) => {
    const sensors = await getSensors();
    res.send(sensors);
});

async function addValue(value) {
    if (parseFloat(value.value) === value.value) {

        const result = await client.query(
            "SELECT id, name FROM sensors WHERE token = $1;",
            [value.token]
        );

        if (result.rows.length > 0){
            const name = result.rows[0].name;
            const sensorid = result.rows[0].id;
            await client.query(
                "INSERT INTO values (value, unit, sensor, date, sensorid) VALUES ($1, $2, $3, NOW(), $4);",
                [value.value, value.unit, name, sensorid]
            );
            return HttpStatus.ACCEPTED;
        } else {
            return HttpStatus.BAD_REQUEST;
        }

    } else {
        return HttpStatus.BAD_REQUEST;
    }
}

async function getValues(sensorid, size) {
    const result = await client.query(
        "SELECT value, date FROM values WHERE sensorid = $1 ORDER BY date DESC limit $2;",
        [parseInt(sensorid), size]
    );

    let data = result.rows;
    let n = data.length;

    let step = Math.floor(n / 1000);

    if (step > 1){
        let new_data = [data[0]];
        for (let i = 1; i < n; i++) {
            if (i%step === 0){
                let temp = new_data.pop();
                temp['value'] = temp['value'] / step;
                new_data.push(temp);
                new_data.push(data[i]);
            } else {
                let temp = new_data.pop();
                temp['value'] = temp['value'] + data[i]['value'];
                new_data.push(temp);
            }
        }
        console.log(new_data.length);
        return new_data;
    }

    return data;
}

async function getSensors() {
    const result = await client.query(
        "SELECT id, name FROM sensors;"
    );
    return result.rows;
}

module.exports = {
    router,
    addValue,
    getValues,
    getSensors
};
