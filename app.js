const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https=require("https");
const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email
    const data={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    }
    
    const jsondata= JSON.stringify(data);
    const url="https://us1.api.mailchimp.com/3.0/lists/2a9ddbca0b "

    const options={
        method: "POST",
        auth: "tushar1:253ca395cfcf78722bd6ab8c88e26814-us1"  
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode==200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();  

})

app.post("/failure.html",function(req,res){
    res.redirect("/")
})

app.listen(3000,function(){
    console.log("server has started");
})








// {
//     "email_address": "$user_email",
//     "status": "subscribed",
//     "merge_fields": {
//       "FNAME": "$user_fname",
//       "LNAME": "$user_lname"
//     }
//   }