const conn = require('../../config/serverDB');
const { response } = require('../../config/server');

module.exports = (app) => {

    app.post('/getColaboradoresData', (req, res, next) => {
        let querry =  `select * from colaborador where c_id = ${req.body.id}`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Datos de usuario obtenidos", formularios});
        });

    });

    app.post('/updateColaboradorData', (req,res,next) => {
        let querry = `update colaborador set nombre = '${req.body.nombre}', c_foto= '${req.body.foto}',apellido = '${req.body.apellido}', correo = '${req.body.correo}', telefono = '${req.body.telefono}', c_contraseña = '${req.body.contraseña}' where c_id = ${req.body.id}`;
        
        conn.query(querry, (err, formularios,cols) => {
            if (err) res.json({status: 0, message: `${err}`});  
            else res.json({status: 1, message: "Datos de usuario Actualizados", formularios});
        });
    });

    app.post('/cambiarEstadoColab', (req,res,next) => {
        let querry = `update colaborador set estado = '${req.body.estado}' where c_id = ${req.body.id}`;

        conn.query(querry, (err, formularios, cols) => {
            if (err) res.json({status: 0, message: `${err}`});  
            else res.json({status: 1, message: "Datos de usuario Actualizados", formularios});
        });
    });

    app.post('/getColaboradoresEstado', (req, res, next) => {
        let querry =  `select estado from colaborador where c_id = ${req.body.id}`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Datos de usuario obtenidos", formularios});
        });
    });

    app.post('/setMyPositionCollab', (req, res, next) => {
        let query = `Update colaborador set ubicacion = '${req.body.ubicacion}' where c_id = ${req.body.id}`;
        console.log(query);
        conn.query(query, (err, formularios, cols) => {
            if (err) res.json({status: 0, message: `${err}`});  
            else res.json({status: 1, message: "Ubicacion ha sido actualizada", formularios});
        });
    });

    app.post('/getColabNombre', (req, res, next) => {
        let querry =  `select nombre, apellido, telefono, total_contratos, total_estrellas, c_foto from colaborador where c_id = ${req.body.c_id}`;
        console.log(querry);
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Datos de usuario obtenidos", formularios});
        });

    });

    app.post('/getCollabUbicacionByID', (req, res, next) => {
        let querry =  `select ubicacion from colaborador where c_id = ${req.body.id}`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Ubicaion del Colaborador obtenida", formularios});
        });

    });
}

