const path = require('path');
const express = require('express');
const hbs  = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000


// define pathe for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewDirectory = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDirectoryPath));

// setup handelbars engine and views location
app.set('view engine','hbs');
app.set('views',viewDirectory);

hbs.registerPartials(partialPath);

app.get('', (req,res) => {
 
    res.render('index',{
        title:'Weather App',
        name:'oussama'
    })

})

app.get('/about', (req,res) => {
    res.render('about',{
        title:'About me',
        name : 'oussama'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.adress)
    {
        return res.send({
            error : 'you must insert in adress'
        })
    }
    const location = req.query.adress;
    geocode(location, (error,{latitude,longitude,location} = {}) => {
        if(error)
        {
            return res.send({error});
        }
       forecast(latitude,longitude,(error,forcastData) => {
           if(error)
           {
            return res.send({error});
           }
        console.log(location);
        console.log(forcastData);
        res.send({
            forecast : forcastData,
            location,
            adress : location
        })
    });
    });
    
   
})



app.get('/products', (req,res) => {
    if(!req.query.search) {
   return  res.send ({
         error : 'You must provide a search term'
     })
    }
   
    console.log(req.query.search)
    res.send({
        products : []
    })
 
})
app.get('/help', (req,res) => {
    res.render('help',{
        title:'this is help page',
        name:'oussama'
    })
})
// app.get('*',(req,res) => {
//     res.send('My 404 page');
// })

app.listen(port, () => {
    console.log("server is up on port 3000");
}); 
