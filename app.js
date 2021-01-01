const request = require('request');

const url = 'http://api.weatherstack.com/current?access_key=92aae5f123982b43a5a6244518853471&query=bhilai';
const MapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/mahasamund.json?access_token=pk.eyJ1Ijoic3VyYWpzYWh1NjY1IiwiYSI6ImNramVkdWFxYTNid3UyeW5xYWp4bHV5c2UifQ.bO0JRGll3AZFYgMNZ-sbTA';


request({ url:url, json:true }, function(error,response){
    if(error){
        console.log(error)
        console.log('Unable to find website')
    }else if(response.body.error){
        console.log((response.body.error.info));
    }else if(response.body.current && response.body.location)
    {
    const current = response.body.current;
    const location = response.body.location;
    console.log(`
    ============================WEATHER======================
    Todays weather: ${current.weather_descriptions[0]}
    Temp: ${current.temperature} in Celcious
    Location: ${location.name},${location.region}(${location.country})
    Lat:${location.lat}
    Lon:${location.lon}
    Humidity: ${current.humidity}
    `)
    }else{
        console.log('Invalid Output')
    }
});

request({url : MapBox, json : true}, (error,response) => {
   
    console.log(`
    ============================MAPBOX======================
    Type : ${response.body.type},
    Query : ${response.body.query},
    Place Name:${response.body.features[0].place_name}
    bbox:${response.body.features[0].bbox}
    center:${response.body.features[0].center}
    `);

});
