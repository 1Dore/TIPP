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
        let querry = `Insert into Usuarios (nombre, apellido, correo, contraseña, u_foto) values ('${req.body.nombre}', '${req.body.apellido}', '${req.body.correo}', '${req.body.contraseña}', '${req.body.foto}')`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Se creo un nuevo usuario" , formularios});

        });
    });


    //------------------------------------Colaboradores---------------------------------------------------


    app.post('/getColaboradores/', (req, res, next) => {

        let querry = `Select * from colaborador where correo = '${req.body.correo}' and c_contraseña = '${req.body.contraseña}'`;
        conn.query( querry, (error, formularios, cols) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Se obtvo informacion satisfactoriamente del formulario", formularios});

        });

    });

    app.post('/newColab', (req, res, next) => {

        let query = `Insert into colaborador (nombre, apellido, correo, c_contraseña, c_foto) values ('${req.body.nombre}', '${req.body.apellido}', '${req.body.correo}', '${req.body.password}', '${req.body.foto}')`;
        conn.query(query, (error, form, cols) => {

            if(error) res.status(500).json({status: 0, message: "No se pudo insertar el formulario"});
            else res.json({status: 1, menssage: "Insercion realizada"});

        });
    });

    app.get('/getEtiquetas', (req, res) => {
        let query = `Select * From etiquetas`;

        conn.query(query, (error, formularios, cols) => {
            if(error) res.json({status: 0, message: "No se pudo obtener los errores"});
            else res.json({status: 1, message:"se obtivieron etiquetas",formularios});
        });
    });

    app.post('/setTagsForCollab', (req, res, next) => {
        let query = `Insert Into relacion_etiquetas_y_colab(c_id, e_id) values (${req.body.c_id}, ${req.body.e_id})`;

        conn.query(query, (error, form, cols) => {
            if(error) res.json({status: 0, message:"No se pudo insentar la relacion"});
            else res.json({status: 1, message:"Insercion Exitosa"});
        });
    });

    app.post('/getCollabIdByEmail', (req, res, next) => {
        let query = `Select c_id From colaborador Where correo = '${req.body.correo}'`;

        conn.query(query, (error, formularios, cols) => {
            if(error) res.json({status: 0, message: "no exite un id el cual tenga ese correo"});
            else res.json({status: 1, formularios})
        })
    });

    app.post('')

    //--------------------ADMIN--------------------------------------
    app.post('/getAdmin', (req, res, next) => {

        let querry = `Select * from administrador where correo = '${req.body.correo}' and contraseña = '${req.body.password}'`;
        conn.query( querry, (error, formularios, cols) => {

            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Se obtvo informacion satisfactoriamente del formulario", formularios});

        });

    });

}