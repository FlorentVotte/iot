/**
 * Created by Florent on 23/03/2020.
 */
const url = process.env.API_URL || 'http://localhost:9000';

export default async function getValues(sensorid) {
    const response = await fetch(url + '/values?sensor=' + sensorid, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = await response.json();
    let formated = json.reverse().map(item => createData(formatDate(item.date), item.value));
    return formated
}

function createData(time, value) {
    return { time, value };
}

function formatDate(date) {
    const dateObj = new Date(date);
    return dateObj.getHours() + ':' + dateObj.getMinutes() + ' ' + dateObj.getDate() + '/'
        + (parseInt(dateObj.getMonth()) + 1) + '/' + dateObj.getFullYear();
}