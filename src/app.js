const path = require('path')
const express= require('express')
const hbs = require('hbs')
const geocode = require('./utiles/geocode')
const forcast =require('./utiles/forcast')
const app = express()
//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const veiwPath = path.join(__dirname,'../templates/views')
const partialPath =path.join(__dirname,'../templates/partials')



//setup handlebars and viewslocation
app.set('view engine','hbs')
app.set('views',veiwPath)
hbs.registerPartials(partialPath)

//setup atatic directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{

    res.render('index',{
        name: 'apoorv',
        title: 'Weather-app'
     
    })
})

app.get('/about',(req,res)=>{

    res.render('about',{
        name: 'apoor',
        title: 'about'
     
    })
})

app.get('/help',(req,res)=>{

    res.render('help',{
        help: 'some apoorv',
        name: 'apoor',
        title: 'help'
     
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'You msut provide addres'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
           if(error){
               return res.send({error})
           }

    forcast(latitude,longitude,(error,forcastData)=>{
        if(error){
            return res.send(error)
        }
        res.send({
            forcast:forcastData,
            location,
            address:req.query.address
        })
    })
  })
})




app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a query'
    })
}

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
    title:'404',
    name: 'apoorv',
    errorMessage:'help  404 not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'apoorv',
        errorMessage:'page not found'
    })

})


app.listen(3000,()=>{
  console.log('server is runnig')  
})