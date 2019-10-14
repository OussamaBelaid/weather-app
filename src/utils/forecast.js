const request = require("request");
const Forecast = (lat,lng,callback) => {
    const url = 'https://api.darksky.net/forecast/0f0c10e39a85da62b6e8029e520c539b/'+lat+','+lng;
    request({url,json : true}, (error,{body}) => {
if(error)
{
    callback("Unable de connect to darksky api " , undefined)
}
else if (body.error)
{
    callback("darksky api error : "+body.error , undefined)
}
else 
{
   callback(undefined,body.daily.data[0].summary + `It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`);
}
})
}
module.exports = Forecast;