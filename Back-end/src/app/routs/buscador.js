const conn = require('../../config/serverDB');
const { response } = require('../../config/server');
    
module.exports = (app) => {

    app.post('/getCollabsIDs', (req, res, next) => {
        let querry =  `select distinct col.c_id from relacion_etiquetas_y_colab as rel, colaborador as col, etiquetas as e where rel.c_id = col.c_id and rel.e_id = e.e_id and ${req.body.where}`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Se obtvo informacion satisfactoriamente del formulario", formularios});

        });
    });

    app.post('/getCollabInfo', (req, res, next) => {
        let query = `Select nombre, correo, c_foto, c_id, apellido, ubicacion, total_contratos, total_estrellas From colaborador Where c_id = ${req.body.id}`;
        conn.query( query, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Se obtvo informacion satisfactoriamente del formulario", formularios});
        });
    });

    app.post('/getCollabTags', (req, res, next) => {
        let query = `Select e.e_id, e.e_nombre From etiquetas as e, relacion_etiquetas_y_colab as r Where r.c_id = ${req.body.id} AND e.e_id = r.e_id`;
        conn.query( query, (error, formularios, cols) => {
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

    app.post('/getEtiquetas', (req, res, next) => {
        let querry = `select * from etiquetas`;
        conn.query( querry, (error, formularios, cols) => {
            
            if (error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Se obtvo informacion satisfactoriamente del formulario", formularios});

        });

    });


}