const request = require('request');

const geocode = (address, callback) => {
    const urlMap = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2hyaXMtZGV2LTQ5IiwiYSI6ImNqdHQwbDB6NjA0ZjI0Zmxwdmp6NzBxanAifQ.fr7XJnCfgvy2F6gddA7tOQ';
    request({
        uri: urlMap,
        json: true
    }, (err, res, {
        features
    } = {}) => {
        if (err) {
            console.log(err);
            callback('Unable to connect to location services', undefined);
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            });
        }
    });
};

module.exports = geocode;