var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'nickpSQL',
        password: 'blue1234',
        server: 'DESKTOP-UB8RIFR\\SQLEXPRESS', 
		port: 1433,
        database: 'SafeAccountsAPI_Db',
		options: {           
			encrypt: false
		}
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT * FROM INFORMATION_SCHEMA.TABLES;', function (err, recordset) {
            
            if (err) console.log(err)
		
            // send records as a response, but lets shorten that heavy response
            res.send(recordset.recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});