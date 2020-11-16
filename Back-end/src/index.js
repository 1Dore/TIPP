const app = require('./config/server');

require('./app/routs/register-login')(app);
require('./app/routs/buscador')(app);
require('./app/routs/admin')(app);
require('./app/routs/contratos')(app);
require('./app/routs/usuario')(app);
require('./app/routs/colaboradores')(app);


app.get('/try', (req, res) => {
    res.json({test: `Hello World! from port: ${app.get("port")}`})
});

app.listen(app.get("port"), () => 
    console.log(`El servidor esta corriendo en el puerto ${app.get("port")}`)
);
