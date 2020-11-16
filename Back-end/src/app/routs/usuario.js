const conn = require('../../config/serverDB');
const { response } = require('../../config/server');

module.exports = (app) => {

    app.post('/getUsuariosData', (req, res, next) => {
        let querry =  `select * from usuarios where u_id = ${req.body.id}`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Datos de usuario obtenidos", formularios});
        });

    });

    app.post('/updateUserData', (req,res,next) => {
        let querry = `update usuarios set nombre = '${req.body.nombre}', U_foto='${req.body.foto}', apellido = '${req.body.apellido}', correo = '${req.body.correo}', telefono = '${req.body.telefono}', contraseña = '${req.body.contraseña}' where u_id = ${req.body.id}`;
        console.log(querry)
        conn.query(querry, (err, formularios,cols) => {
            if (err) res.json({status: 0, message: `${err}`});  
            else res.json({status: 1, message: "Datos de usuario Actualizados", formularios});
        });
    });

    app.post('/getUsuarioNombre', (req, res, next) => {
        let querry =  `select nombre, apellido, telefono, total_contratos, total_estrellas, u_foto from usuarios where u_id = ${req.body.u_id}`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Datos de usuario obtenidos", formularios});
        });

    });

    app.post('/setMyPositionUser', (req, res, next) => {
        let query = `Update usuarios set ubicacion = '${req.body.ubicacion}' where c_id = ${req.body.id}`;
        console.log(query);
        conn.query(query, (err, formularios, cols) => {
            if (err) res.json({status: 0, message: `${err}`});  
            else res.json({status: 1, message: "Ubicacion ha sido actualizada", formularios});
        });
    });

    app.post('/getUserbUbicacionByID', (req, res, next) => {
        let querry =  `select ubicacion from usuarios where u_id = ${req.body.id}`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Ubicaion del Colaborador obtenida", formularios});
        });

    });
    

}