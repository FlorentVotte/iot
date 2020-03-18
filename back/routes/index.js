const express = require('express');
const router = express.Router();

const { Client } = require('pg');
client = new Client({
    connectionString: process.env.DATABASE_URL
});

client.connect();


/* GET home page. */
router.get('/', function(req, res, next) {

    res.send({ hello: "Hello World!"});

});


router.post('/value', function(req, res, next) {

    let value = req.body;

    addValue(value, function (status) {
        res.sendStatus(status);
    });

});


async function addValue(value, statusCallback) {

    if (parseFloat(value.value) === value.value){

        let status = 200;

        try {

            await client.query('INSERT INTO values (value, unit, sensor, date) ' +
                'VALUES ($1, $2, (SELECT  name FROM sensors WHERE token = $3), NOW());',
                [value.value, value.unit, value.token]);

        } catch(error) {

            status = 400;

        }

        statusCallback(status);

    } else {

        statusCallback(400);

    }

}


module.exports = {
    router,
    addValue
};
