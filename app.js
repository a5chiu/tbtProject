'use strict'
//getting express package
var express = require('express');
var path = require('path');
var reload = require('reload');
var mongo = require('mongodb');
var assert = require('assert');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

//url to store database
var url = "mongodb://tbtowner:Cinnamon1521724@ds143030.mlab.com:43030/tbtserver";

//calling it into app
var app = express();

var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));


//connects to the server of port 8080
var server = app.listen(process.env.PORT || 8080, function(req, res) {
    console.log("App listening on Port %s", server.address().port);
    console.log("test");
});


//transporter for email
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
        user: 'alexchiu1901@gmail.com',
        pass: 'Cinnamon1521724'
    },
});


//loads static files (css and javascript: exclusing main js)
app.use('/public', express.static(path.join(__dirname, 'public')));

//sends html file
app.get('/', function(req, res) {
    res.status(200).sendFile(__dirname + '/index.html');
});

app.post('/Submitted', function(req, res) {

    var item = {
        //tite of name in form (req.body.NAME)
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        phone_number: req.body.phoneNumber,
        email: req.body.email,
        subject: req.body.subject,
        description: req.body.description
    };

    console.log("stage 2");
    //connecting to database
    //function has error if error, or database if successful
    mongo.connect(url, function(error, database) {
        assert.equal(null, error);

        //calls collection database and inserts one item
        //insertOne has call back fuction to see if it was successful or error
        database.collection('customerInfo').insertOne(item, function(err, result) {
            //if err is null, it is okay!
            assert.equal(null, err);

            console.log("insertion successful");

            //close database
            database.close();

            res.sendFile(__dirname + '/accepted.html');
        });
    });

    var message = "First Name: " + item.first_name + "\n" + "Last Name: " + item.last_name +
        "\n" + "Phone Number: " + item.phone_number + "\n" + "Email: " + item.email + "\n" +
        "Subject: " + item.subject + "\n" + "Description: " + item.description;

    var mailOptions = {
        from: '"Alex Chiu" <alexchiu1901@gmail.com>',
        to: 'a5chiu@ucsd.edu',
        subject: 'TBT EMAIL BOT',
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info) {
        assert.equal(null, error);

        console.log("Email Sent Successfully");
    });

});


reload(app);