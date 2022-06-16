const express = require('express');

const nodemailer = require('nodemailer');
var dbConn = require('./dbConnection');
var async = require('async');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            
   //access-control-allow-credentials:true,
   optionSuccessStatus:200,
}


const app = express();
const PORT = 9005;

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
      user: 'brahimboufous214@gmail.com',
      pass: 'krywjgfcxdmdtsdv',
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});


app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:9005");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(cors(corsOptions)) // Use this after the variable declaration


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);


app.get('/', (req, res) => {
  //res.sendFile('C:/Users/pc hp/Desktop/Projets/BlockChain/Cryptoficat/src/index.html')
      
});



app.get('/login', (req, res) => {
    
    let email=req.query['username']; //req.body.email;
    let password=req.query['password']; //req.body.password;
    findByLog(email,password, function(err, result) {
        if (err){
           console.log(err); }
       
        else{   res.json(result ); 
                console.log(result);
                //res.send(result)
            }
       });
    
  });


app.get('/sendMail', (req, res) => {
    let code=req.query['code']; //req.body.email;
    let email=req.query['email']; 
    let name=req.query['name'];//req.body.password;
    
    const mailData = {
        from: 'brahimboufous214@gmail.com',
        to: email,
        subject: "Diplome Hash code",
        text: "Bonjour , voici le hash code de votre diplome : "+code+" .Pour voir votre diplome consulter le lien : http://localhost:3000/index.html .",
        
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});

  



  //-------------------
  findByLog = function (email,password, result) {
    dbConn.query("Select * from users where username = ? and password = ? ",[email,password], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
    });
  };
//-------------------

