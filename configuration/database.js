var mssql = require('mssql');
var express = require('express');
var app = express();

/* var config = require('../configuration/config.js');
 var connection = mssql.connect(config.databaseOptions, function (error) {
     console.log('error'+error)
 });
console.log(connection);
if(connection.state=="connected")
console.log("connected");
else
console.log("connection failed");  */

/* config.connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  }); */

  var config = require('../configuration/config.js');

mssql.connect(config.config, function (error) {
    
    if (error) console.log(error);

    else
    console.log('connected')

    // create Request object
    var request = new mssql.Request();
       
    // query to the database and get the records
    request.query('select top 10 * from unicas_config.dbo.Program', function (error, recordset) {
        
        if (error) console.log(error)

        // send records as a response
        console.log(recordset)
        
    });

});