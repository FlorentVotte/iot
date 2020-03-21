/**
 * Created by Florent on 19/03/2020.
 */
const { Client } = require("pg");

let url;
switch (process.env.NODE_ENV){
    case ('development'):
        url = process.env.DEV_DATABASE_URL;
        console.log("Dev BDD");
        break;
    case ('test'):
        url = process.env.TEST_DATABASE_URL;
        console.log("Test BDD");
        break;
    case ('production'):
        url = process.env.DATABASE_URL;
        console.log("Prod BDD");
        break;
}

client = new Client({
    connectionString: url
});

client.connect();

module.exports = {
    client
};
