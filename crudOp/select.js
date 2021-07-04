var mysql = require("mysql");
// const { exit } = require("process");
const dotenv = require('dotenv');
dotenv.config({path:'./.env'})
var dbconn = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});

module.exports = {
    verifyCredentials : function(uname,pwd){
        dbconn.connect();//establish connection with Database
        if(uname=="" || pwd=="")
        {
            console.log("Empty username or password");
            return false;
        }
        var sql = "SELECT username,password FROM users_table where username='"+uname+"' and password='"+pwd+"'";
        // console.log(sql);
        var check = false;
        dbconn.query(sql,check = function(err,result){
            if(err)
            {
                console.error(err);
                return false;
            }
            if(result.length==1)
            {
                console.log(check);
                return true;
            }
            else{
                
                return false;
            }
            
        })
        return check;
    }

    
};



