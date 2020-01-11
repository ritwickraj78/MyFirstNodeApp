const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
const app = express()
const port = process.env.PORT || 3000
const viewPath = path.join(__dirname,'../public/views')
const partialPath = path.join(__dirname,'../public/partial')
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title : "Weather",
        name : "Ritwick Raj"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Ritwick Raj'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        name:"Ritwick Raj",
        message : 'ritwickraj78@gmail.com'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Location not entered"
        })
    }
        geocode(req.query.address,(error,data)=>{
            if(error){
                return res.send({
                    error
                })
            }
            forecast(data.longitude,data.latitude,(error,forecastData)=>{
                if(error){
                    return res.send({
                        error:error
                    })
                }
                res.send({
                    location : data.location,
                    forecast : forecastData,
                    address:req.query.address
                })
            })
        })

    
    
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        error:"Help Data Not Found",
        name:"Ritwick Raj"
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        error:"File Not Found",
        title: "404",
        name: "Ritwick Raj"
    })
})
app.listen(port,()=>{
    console.log("server is up on port "+port)
})