const config = require("./db.config.js");
const mysql=require("mysql");
const { PORT } = require("./db.config.js");

var mysqlConnection=mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password:config.PASSWORD,
    database: config.DB,
    PORT:config.PORT
});

mysqlConnection.connect((err)=>{
    if(!err) { console.log('DB succesfully connected')}
    else {console.log('DB failed to connect  error:'+err)}
 });

// Controllers mjehdin 3la models
//models fihom classe w ses fonction 3adyiin b des parametres f westhom requetes sql 
//controllers kayakhdo request w kayexecutew 3lihom models functions w kayreddo l reponse selo besoin
module.exports = mysqlConnection;