const request = require('request')
const forcast =(latitude,longitude,callback)=>{
 const url = 'http://api.weatherstack.com/current?access_key=6780f234ea3f5367cdbde967b7dae19b&query=' +latitude+','+longitude+'&units=f'

 request({url,json:true },(error,{body})=>{
     if(error){
         callback('unable to coone t',undefined)

     }else if(body.error){
         callback('unable to fond',undefined)

     }else{
         callback(undefined,body.current.weather_descriptions[0] +'. it is currently ' + body.current.temperature + ' degrees out. there is ' + body.current.feelslike +' degrees out.')

     }
 })
}
module.exports = forcast