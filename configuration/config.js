var mssql = require('mssql');

 /* var databaseOptions = {
    host     : '10.10.11.15',
    database : 'master',
    user     : 'unicas',
    password : 'unicas',
    port     : '1433'
};
module.exports = {databaseOptions: databaseOptions} ;  */

/* let connection = mssql.createConnection({
    host     : '10.10.11.15',
    database : 'master',
    user     : 'unicas',
    password : 'unicas',
    port     : '1433'
});

module.exports = {connection} ; */

var env = process.env.CAS_ENV;
var EcoSystemName = process.env.ecoSystemName;
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
    case 'ecosystem'      :   config = {
                          server     : 'internal-EcoName.litest.io',
                          database : 'master',
                          user     : 'unicas',
                          password : 'unicas',
                          port     : 1433
                          };
                             break;
}

/* var integration = {
    server     : '10.10.11.15',
    database : 'master',
    user     : 'unicas',
    password : 'unicas',
    port     : 1433
};

var stage = {
    server     : '192.168.55.214',
    database : 'master',
    user     : 'unicas_auto',
    password : 'P@ssw0rdStg1',
    port     : 1433
};



var eco = {
    server     : 'internal-EcoName.litest.io',
    database : 'master',
    user     : 'unicas',
    password : 'unicas',
    port     : 1433
};
 */


if(env=='ecosystem')
config.server.replace('EcoName',EcoSystemName);

module.exports = {config} ;