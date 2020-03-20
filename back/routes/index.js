const express = require("express");
const { client } = require("../db/index.js");
const router = express.Router();

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
        try {
            await client.query(
                "INSERT INTO values (value, unit, sensor, date) VALUES ($1, $2, (SELECT  name FROM sensors WHERE token = $3), NOW());",
                [value.value, value.unit, value.token]
            );
            return 200;
        } catch (error) {
            return 400;
        }
    } else {
        return 400;
    }
}

module.exports = {
    router,
    addValue
};
