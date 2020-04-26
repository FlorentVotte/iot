/**
 * Created by Florent on 23/03/2020.
 */
const url = process.env.API_URL || 'http://api.votte.eu';

export default async function getValues(sensorid, size) {
    const response = await fetch(url + '/values?sensor=' + sensorid + "&size=" + size, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = await response.json();
    console.log(json);
    let formated = json.reverse().map(item => createData(formatDate(item.date), item.value-3));
    return formated
}

function createData(time, value) {
    return { time, value };
}

function formatDate(date) {
    const dateObj = new Date(date);
    let h = dateObj.getHours() > 9 ? dateObj.getHours() : '0' + dateObj.getHours();
    let m = dateObj.getMinutes() > 9 ? dateObj.getMinutes() : '0' + dateObj.getMinutes();
    let M = (dateObj.getMonth() + 1) > 9 ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1);
    return h + ':' + m + ' ' + dateObj.getDate() + '/'
        + M + '/' + dateObj.getFullYear();
}
