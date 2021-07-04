// console.log("Hello World")
var express = require('express');
var session = require('express-session');
var app = express();
const bodyparser = require('body-parser');
var mysql = require('mysql');
const dotenv = require('dotenv');
var verify_credentials = false;
dotenv.config({path: './.env'});
var dbconn = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


dbconn.connect((error) =>{
	if(error){
		console.log(error);
	}
	else{
		console.log("Database connection established")
	}
})
var selectOperations = require('./crudOp/select');//for getting data from Database
//var insertOperations =  require('./crudOp/select');//For inserting data into database

// var bootstrap = require('bootstrap');
app.set('view engine','ejs');
app.use('/assets', express.static('assets'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.get('/',function(req,res){
	
	res.render('index');
})

app.get('/auth', function(req,res){

	if(verify_credentials){
		res.redirect('dashboard');
	}
	else{
		res.render('login');
	}
	

	// res.render('admin');
});

app.get('/dashboard',function(req,res){
	console.log('admin page');
	if(verify_credentials)
		res.render('dashboard');
	else{
		res.redirect('/auth');
	}	
});

app.post('/login',function(req,res){
	const email = req.body.emailaddress;
	const password = req.body.password;
	verify_credentials =false;

	verify_credentials = selectOperations.verifyCredentials(email,password);
	if(verify_credentials){
		console.log("Login Success");
		// res.render('admin');
		req.session.loggedin = true;
		req.session.username = email;
		res.redirect('/dashboard');//go to admin page
	}
	else{
		console.log("login unsuccessful");
	}
});

app.get('/signUp',function(req,res){

	if(verify_credentials)
	{
		res.redirect('/dashboard'); //if already sign in go to the dash board
	}
	else{
		res.render('signUp'); //render the sign up page
	}
})

app.listen(3000);


