var mysql = require("mysql");

var dbconn = mysql.createConnection({
    host:"localhost",
    user:"salman",
    password:"nopassword",
    database:'testdb'
});


dbconn.connect();
var dummy_data = {username: "salman@gmail.com", password:"123456"};

dbconn.query('INSERT INTO users_table set ?',dummy_data,function(err,result){
    if(err){
        console.error(err);
        return;
    }
    
        //console.error(result);
   console.log(result);
    
});