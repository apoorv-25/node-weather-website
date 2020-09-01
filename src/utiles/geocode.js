const request =require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXBvb3J2MjUiLCJhIjoiY2tlYTl0ZDBoMDVoOTJ0cWoyY2Z0YXlvOSJ9.-c5eKvz_j74NdCCK3iRs2Q&limit=1'
    
    request({url,json:true},(error,{body})=>{
        if(error){
            console.log(body)
            callback('unable to connect to inetrnate')
        } else if(body.features.length === 0,undefined){
            callback('unable to find location ')
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode