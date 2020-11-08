const conn = require('../../config/serverDB');
const { response } = require('../../config/server');

module.exports = (app) => {

    app.post('/newContrato', (req, res, next) => {
        let date = new Date(req.body.fecha_inicio);             //creo un objeto date que recibe un string con la forma de un objeto date de ts y este lo transforma en parametros para crear un objeto Date en JS
        let querry =  `Insert into contratos (f_init, u_id, c_id, estado) values ($1, ${req.body.u_id}, ${req.body.c_id}, 'E')`; //$1 es una forma de transformar el dato, $1 meteria a la vase de datos un DATE
        conn.query( querry, [date], (error, formularios) => {
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

    app.post('/getContratosForUser', (req, res, next) => {
        let query = `Select * From Contratos Where u_id = ${req.body.u_id}`;

        conn.query(query, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `Error al buscar contratos: ${error}`});
            else res.json({status: 1, message: "Contratos Obtenidos", formularios});
        });
    });

    app.post('/getCitasForCollab', (req, res, next) => {
        let query = `Select * From Contratos Where c_id = ${req.body.c_id}`;

        conn.query(query, (error, formularios, cols) => {
            if (error) res.json({status: 0, message: `Error al buscar contratos: ${error}`});
            else res.json({status: 1, message: "Contratos Obtenidos", formularios});
        });
    });

    //Querys para el Chat
    app.post('/getMessages', (req, res, next) => {
        let query = `Select * From mensajes  Where con_id = ${req.body.con_id} ORDER BY m_id`;
        conn.query(query, (error, formularios, cols) => {
            if(error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Obtecion de los mensajes exitoso", formularios});
        });
    });

    app.post('/sendMessage', (req, res, next) => {
        let date = req.body.fecha;
        let querry = `Insert into mensajes (con_id, sendBy, content, fecha) Values (${req.body.con_id}, '${req.body.emisor}', '${req.body.content}', $1)`;
        console.log(querry);
        conn.query( querry, [date], (error, formularios) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Mensaje enviado satisfactoriamente", formularios});
        });
    });

    //querrys para las citas
    app.post('/getCitasColab', (req, res, next) => {
        let query = `Select * from contratos Where c_id = ${req.body.id} and (estado = 'A' or estado = 'E')`;
        conn.query(query, (error, formularios, cols) => {
            if(error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Obtecion de los mensajes exitoso", formularios});
        });
    });

    app.post('/getCitasUser', (req, res, next) => {
        let query = `Select * from contratos Where u_id = ${req.body.id} and (estado = 'A' or estado = 'E')`;
        conn.query(query, (error, formularios, cols) => {
            if(error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Obtecion de los mensajes exitoso", formularios});
        });
    });

}
