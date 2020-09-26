const conn = require('../../config/serverDB');
const { response } = require('../../config/server');

module.exports = (app) => {

    app.post('/newEtiquetas', (req, res, next) => {
        let querry =  `Insert into etiquetas (e_nombre, descripcion) values (${req.body.nombre}, ${req.body.descripcion})`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Se creo una etiqueta satisfactoriamente", formularios});

        });

    });

    app.post('/editarEtiquetas', (req, res, next) => {
        let querry =  `Update into etiquetas (e_nombre, descripcion) values (${req.body.nombre}, ${req.body.descripcion}`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Etiqueta editada", formularios});

        });

    });

}