const express = require("express");
const { getDB } = require("../db/index.js");
const router = express.Router();
const HttpStatus = require('http-status-codes');

const client = getDB();

router.get("/", (req, res, next) => {
    res.send({ hello: "Hello World!" });
});

router.post("/value", async (req, res, next) => {
    const status = await addValue(req.body);
    res.sendStatus(status);
});

router.get("/value", async (req, res, next) => {
    const values = await getValues(req.query.sensor);
    if (values.length) {
        res.send(values);
    } else {
        res.sendStatus(HttpStatus.BAD_REQUEST);
    }
});

router.get("/sensor", async (req, res, next) => {
    const sensors = await getSensors();
    if (sensors.length) {
        res.send(sensors);
    } else {
        res.sendStatus(HttpStatus.BAD_REQUEST);
    }
});

async function addValue(value) {
    if (parseFloat(value.value) === value.value) {

        const result = await client.query(
            "SELECT  name FROM sensors WHERE token = $1;",
            [value.token]
        );

        if (result.rows.length > 0){
            const name = result.rows[0].name;
            await client.query(
                "INSERT INTO values (value, unit, sensor, date) VALUES ($1, $2, $3, NOW());",
                [value.value, value.unit, name]
            );
            return HttpStatus.ACCEPTED;
        } else {
            return HttpStatus.BAD_REQUEST;
        }

    } else {
        return HttpStatus.BAD_REQUEST;
    }
}

async function getValues(sensor) {
    const result = await client.query(
        "SELECT value, date FROM values WHERE sensor = $1 ORDER BY date DESC limit 10;",
        [sensor]
    );
    return result.rows;
}

async function getSensors() {
    const result = await client.query(
        "SELECT  name FROM sensors;"
    );
    return result.rows;
}

module.exports = {
    router,
    addValue
};
