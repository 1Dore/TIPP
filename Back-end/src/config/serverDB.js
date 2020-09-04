const {Client} = require('pg');

const client = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "dbTIPP"
})

client.connect((error) => {

    if(error){
        console.log(`Error a conectarse a la base de datos ${error}`);
    }
    else{
        console.log("Connection to dbTipp stablished");
    } 

});


module.exports = client;