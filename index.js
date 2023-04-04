const express = require('express');
// const { Server } = require('http');
const path = require('path');
const port = 8080;

const app = express();

var contectList = [
    {
        name : "kunal",
        phone : "1234567890"
    },
    {
        name : "hero",
        phone : "0987654321"
    },
    {
        name : "jhaji",
        phone : "8708989088"
    }
]

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//parsing data through using middleware

app.use(express.urlencoded());

// //making own middleware  1 <-------------------------------
// app.use(function(req,res,next){
//     //making request  <-------------------
//     req.myName = "kunal";
//     //console.log('middleware 1 colled');
//     next();
// })
// //making middeware 2 <==========
// app.use(function(req,res, next){
//     //triying to access in mw2 <---------------
//     console.log("middleware 2 colled" ,req.myName);
//     next();
// })


// Acceessing static files using middleware <-------------

app.use(express.static('Assets'));

//rendring on home

app.get('/',function(request,response){
    // //accessing req of mw1 in controler <-----------
    //  console.log(request.myName);
     return response.render('home',{
        title:'contect list',
        contect_list:contectList
     });
});

//rendring on profile

app.get('/profile',function(request ,response){

    return response.render('profile',{
        title:'my self'
    });
});

//adding contact by geting url

app.post('/create-contect',function(request,response){
    contectList.push({
        name : request.body.name,
        phone : request.body.phone 
    });
    return response.redirect('/');
   
});

//deleting the contact 
app.get('/delete-contact',function(req,res){
    // console.log(req.query);

    //geting query from url
    let phone = req.query.phone;

    let contectIndex = contectList.findIndex(contact => contact.phone == phone);

    if(contectIndex != -1){
        contectList.splice(contectIndex,1);
    }
    return res.redirect('back');
})

app.listen(port,function(err){
    if(err){
        console.log('got Error ',err);
    }
    console.log('yep! it is running',port);

});