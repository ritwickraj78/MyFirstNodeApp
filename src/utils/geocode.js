const request = require('request')
const geocode = (address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2hhbmRleHRlcjcxIiwiYSI6ImNrNTc1Y2I0czBhazUzc3BnbjV5MXcyenQifQ._J7MhiK8NbTPnqirXLiF9w'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Couldnt reach to servers',undefined)
        }
        else if(response.body.features.length===0){
            callback('wrong address',undefined)
        }
        else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}
module.exports = geocode