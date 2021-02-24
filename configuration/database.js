var mssql = require('mssql');
var config = require('../configuration/config.js');

var express = require('express');
var app = express();

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