const conn = require('../../config/serverDB');
const { response } = require('../../config/server');
    
module.exports = (app) => {

    app.post('/getCollabs', (req, res, next) => {
        let querry = 
        `select c.c_id, c.nombre, c.apellido, c.foto, e.e_nombre from colaborador as col, etiquetas as e where '${req.body.where}'`;
        conn.query( querry, (error, formularios, cols) => {
            
            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Se obtvo informacion satisfactoriamente del formulario", formularios});

        });

    });

    app.post('/getCollabsBy', (req, res, next) => {
        let querry = 
        `select c.c_id, c.nombre, c.apellido, c.foto, e.e_nombre from colaborador as col, etiquetas as e where e.e_nombre = '${req.body.etiqueta}'`;
        conn.query( querry, (error, formularios, cols) => {
            
            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Se obtvo informacion satisfactoriamente del formulario", formularios});

        });

    });


};

