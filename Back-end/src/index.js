const app = require('./config/server');
require('./app/rutas/usuarios-colabs')(app);
require('./app/rutas/buscador')(app);


app.listen(app.get("port"), () => 
    console.log(`El servidor esta corriendo en el puerto ${app.get("port")}`)
);

