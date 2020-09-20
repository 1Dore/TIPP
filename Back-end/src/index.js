const app = require('./config/server');
require('./app/routs/register-login')(app);
require('./app/routs/buscador')(app);


app.listen(app.get("port"), () => 
    console.log(`El servidor esta corriendo en el puerto ${app.get("port")}`)
);

