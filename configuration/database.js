var mssql = require('mssql');
var config = require('../configuration/config.js');

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

async function executeQueryWithReturn(queryString) {
    console.log("in dbjs"+queryString)
    console.log(config.config)
    var result;
     try{
     await mssql.connect(config.config) ;
      result = await mssql.query(queryString);
    
    }
    catch(error)
    {
        console.log(error);
    }
       return result  
       
  
}

async function executeQueryWithoutReturn(queryString) {
    console.log("in dbjs"+queryString)
    console.log(config.config)
    var result;
     try{
     await mssql.connect(config.config) ;
      await mssql.query(queryString);
    }
    catch(error)
    {
        console.log(error);
    }
       
  
}

module.exports = { executeQueryWithReturn, executeQueryWithoutReturn };