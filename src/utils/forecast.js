const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/2e4bdb09a7da14d03378c19d02003a58/' + lat + ',' + long + '/?units=si';

    request({
        url,
        json: true
    }, (err, res, {
        error,
        daily,
        currently
    }) => {
        if (err) {
            callback('Unable to connect to forecast services', undefined);
        } else if (error) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, daily.data[0].summary + ` It's currently ${currently.temperature} degrees.\nMaximum temperatures will reach ${daily.data[0].temperatureMax} degrees.`);
        }
    });
};

module.exports = forecast;