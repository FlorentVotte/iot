const express = require("express");
const { client } = require("../db/index.js");
const router = express.Router();
const HttpStatus = require('http-status-codes');

/* GET home page. */
router.get("/", (req, res, next) => {
    res.send({ hello: "Hello World!" });
});

router.post("/value", async (req, res, next) => {
    const status = await addValue(req.body);
    res.sendStatus(status);
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

module.exports = {
    router,
    addValue
};
