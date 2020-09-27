const conn = require('../../config/serverDB');
const { response } = require('../../config/server');

module.exports = (app) => {

    app.post('/newContrato', (req, res, next) => {
        let querry =  `Insert into contratos (f_init, u_id, c_id) values (${req.body.inicio}, ${req.body.u_id}, ${req.body.c_id})`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Se creo un contrato satisfactoriamente", formularios});

        });

    });

    app.post('/terminarContrato', (req, res, next) => {
        let querry =  `Update into contratos (f_init, u_id, c_id) values (${req.body.f_final}, ${req.body.u_id}, ${req.body.c_id})`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Se creo un contrato satisfactoriamente", formularios});

        });

    });

}
