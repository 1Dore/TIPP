const conn = require('../../config/serverDB');
const { response } = require('../../config/server');
    
module.exports = (app) => {

    app.post('/getUsuarios', (req, res, next) => {
        let querry = `Select * from usuarios where correo = '${req.body.correo}' and contraseña = '${req.body.contraseña}'`;
        conn.query( querry, (error, formularios, cols) => {
            
            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Se obtvo informacion satisfactoriamente del formulario", formularios});

        });

    })

    app.post('/newUsuario', (req, res, next) => {

        let query = `Insert into Usuarios (nombre, apellido, correo, contraseña) values ('${req.body.nombre}', '${req.body.apellido}', '${req.body.correo}', '${req.body.contraseña}')`;
        
        conn.query(query, (error, form, cols) => {

            if(error) res.status(500).json({status: 0, message: "No se pudo insertar el formulario"});

            else res.json({status: 1, menssage: "Insercion realizada"});

        });
    });


    //------------------------------------Colaboradores---------------------------------------------------


    app.post('/getColaboradores/', (req, res, next) => {

        let querry = `Select * from colaborador where correo = '${req.params.correo}' and c_contraseña = '${req.params.password}'`;
        conn.query( querry, (error, formularios, cols) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Se obtvo informacion satisfactoriamente del formulario", formularios});

        });

    });

    app.post('/newColab', (req, res, next) => {

        let query = `Insert into colaborador (nombre, apellido, correo, c_contraseña) values ('${req.body.nombre}', '${req.body.apellido}', '${req.body.correo}', '${req.body.password}')`;
        
        conn.query(query, (error, form, cols) => {
            
            if(error) res.status(500).json({status: 0, message: "No se pudo insertar el formulario"});

            else res.json({status: 1, menssage: "Insercion realizada"});

        });
    });
}