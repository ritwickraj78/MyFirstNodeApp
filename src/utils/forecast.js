const request = require('request')
const forecast=(longitude,latitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/9fc03ae779a9a9e8e2bfb1939c58fee4/'+latitude+','+longitude+'?units=si'
    request({url : url , json : true},(error,response)=>{
        if(response.body.error){
            callback('wrong coordinates',undefined)
        }
        else if(error){
            callback('internal error',undefined)
        }
        else{
            const data = response.body.daily.data[0].summary+" It is currently "+response.body.currently.temperature+" degrees celsius "+" and chance of precipitation is "+response.body.currently.precipProbability*100+"%"
            callback(undefined,data)
        }
    })
}
module.exports=forecast