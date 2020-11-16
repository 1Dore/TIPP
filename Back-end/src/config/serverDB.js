const {Client} = require('pg');

const client = new Client({
    user: "tippers",
    password: "@dbtippug2020",
    host: "34.94.235.45",
    port: 5432,
    database: "DBTIPP "
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