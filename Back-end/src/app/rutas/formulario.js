const conn = require('../../config/serverDB');
const { response } = require('../../config/server');
    
module.exports = (app) => {

    app.get('/getUsuarios/:correo/:contraseña', (req, res, next) => {

        let querry = `Select * from usuarios where  correo = ${req.params.correo} and contraseña = ${req.params.correo}`;
        conn.query( querry, (error, formularios, cols) => {

            if (error) res.json({status: 0, message: `${error}`});
            else if (res.json.formularios = 2) res.json({status: 1, message: "Se obtvo informacion satisfactoriamente del formulario", formularios});
            else res.json({status: 0, menssage: "El correo y contraseña no coinciden"})
        });

    })

    app.post('/newUsuario', (req, res, next) => {

        let query = `Insert into Usuarios (nombre, apellido, correo, contraseña) values ('${req.body.nombre}', '${req.body.apellido}', '${req.body.correo}', '${req.body.contraseña}')`;
        
        conn.query(query, (error, form, cols) => {

            if(error) res.status(500).json({status: 0, message: "No se pudo insertar el formulario"});

            else res.json({status: 1, menssage: "Insercion realizada"});

        });
    });
};