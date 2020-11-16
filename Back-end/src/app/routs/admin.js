const conn = require('../../config/serverDB');
const { response } = require('../../config/server');

module.exports = (app) => {

    app.post('/newEtiquetas', (req, res, next) => {
        let querry =  `Insert into etiquetas (e_nombre, descripcion) values ('${req.body.nombre}','${req.body.descripcion}')`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Se creo una etiqueta satisfactoriamente", formularios});
        });

    });

    app.post('/editarEtiquetas', (req, res, next) => {
        let querry =  `Update  etiquetas set e_nombre= '${req.body.nombre}', descripcion='${req.body.descripcion}' where e_id = ${req.body.id}`;
        console.log(querry);
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Etiqueta editada", formularios});
        });
    });

    app.post('/eliminarEtiqueta', (req, res, next) => {
        let querry =  `Delete from etiquetas where e_id = ${req.body.id}`;
        console.log(querry);
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Etiqueta Eliminada", formularios});
        });
    });
    
    app.post('/getAllEtiquetas', (req, res, next) => {
        let querry =  `select * from etiquetas`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Me lo traje todo", formularios});
        });
    });

    app.post('/getAllEtiquetas', (req, res, next) => {
        let querry =  `select * from etiquetas where e_id = ${req.body.id}`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Me lo traje todo", formularios});
        });
    });
    

}