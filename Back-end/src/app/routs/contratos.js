const conn = require('../../config/serverDB');
const { response } = require('../../config/server');

module.exports = (app) => {

    app.post('/newContrato', (req, res, next) => {
        let date = new Date(req.body.fecha_inicio);             //creo un objeto date que recibe un string con la forma de un objeto date de ts y este lo transforma en parametros para crear un objeto Date en JS
        let querry =  `Insert into contratos (f_init, u_id, c_id) values ($1, ${req.body.u_id}, ${req.body.c_id})`; //$1 es una forma de transformar el dato, $1 meteria a la vase de datos un DATE
        conn.query( querry, [date], (error, formularios, cols) => {
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

    app.post('/getFyH', (req, res, next) => {
        let querry =  `select now() as fyh`;
        conn.query( querry, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Fecha y hora obtenida", formularios});
        });

    });


}
