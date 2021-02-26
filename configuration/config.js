var mssql = require('mssql');

var env = process.env.CAS_ENV;
var EcoSystemName = process.env.ECO_NAME;
var config;
switch(env){
    case 'integration' :  config = {
                          server     : '10.10.11.15',
                          database : 'master',
                          user     : 'unicas',
                          password : 'unicas',
                          port     : 1433
                        };
                        break;
    case 'stage'      :   config = {
                          server     : '10.10.11.15',
                          database : 'master',
                          user     : 'unicas',
                          password : 'unicas',
                          port     : 1433
                        };
                           break;
    case 'ecosystem'  :   config = {
                          server     : 'internal-'+EcoSystemName+'.litest.io',
                          database : 'master',
                          user     : 'unicas',
                          password : 'unicas',
                          port     : 1433
                          };
                             break;
}

module.exports = {config} ;