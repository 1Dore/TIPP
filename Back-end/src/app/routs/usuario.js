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
        let querry = `update usuarios set nombre = '${req.body.nombre}', apellido = '${req.body.apellido}', correo = '${req.body.correo}'
        , telefono = '${req.body.telefono}', contraseña = '${req.body.contraseña}' where u_id = ${req.body.id}`;
        conn.query(querry, (err, formularios,cols) => {
            if (err) res.json({status: 0, message: `${err}`});  
            else res.json({status: 1, message: "Datos de usuario Actualizados", formularios});
        });
    });

}