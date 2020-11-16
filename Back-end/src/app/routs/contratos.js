const conn = require('../../config/serverDB');
const { response } = require('../../config/server');

module.exports = (app) => {

    app.post('/newContrato', (req, res, next) => {
        let date = new Date(req.body.fecha_inicio);             //creo un objeto date que recibe un string con la forma de un objeto date de ts y este lo transforma en parametros para crear un objeto Date en JS
        let querry =  `Insert into contratos (f_init, u_id, c_id, estado, descripcion, direccion) values ($1, ${req.body.u_id}, '${req.body.c_id}', 'E', '${req.body.descripcion}', '${req.body.ubicacion}')`; //$1 es una forma de transformar el dato, $1 meteria a la base de datos un DATE
        console.log(querry)
        conn.query( querry, [date], (error, formularios) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Se creo un contrato satisfactoriamente", formularios});

        });

    });

    app.post('/terminarContrato', (req, res, next) => {
        let date = new Date(req.body.fecha);
        let querry =  `Update contratos set f_end = $1, estado = 'N' where con_id = ${req.body.id}`;
        conn.query( querry, [date], (error, formularios) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Se termino un contrato satisfactoriamente", formularios});

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
    app.post('/getCitasColabNuevas', (req, res, next) => {
        let query = `Select * from contratos Where c_id = ${req.body.id} and estado = 'E'`;
        conn.query(query, (error, formularios, cols) => {
            if(error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Obtecion de los mensajes exitoso", formularios});
        });
    });

    app.post('/getCitasColabAgendadas', (req, res, next) => {
        let query = `Select * from contratos Where c_id = ${req.body.id} and estado = 'A'`;
        conn.query(query, (error, formularios, cols) => {
            if(error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Obtecion de los mensajes exitoso", formularios});
        });
    });

    app.post('/cambiarEstadoCitaColab', (req,res,next) => {
        let querry = `update contratos set estado = '${req.body.estado}' where con_id = ${req.body.id}`;
        conn.query(querry, (err, formularios, cols) => {
            if (err) res.json({status: 0, message: `${err}`});  
            else res.json({status: 1, message: "Datos de usuario Actualizados", formularios});
        });
    });
    

    app.post('/getCitasUser', (req, res, next) => {
        let query = `Select * from contratos Where u_id = ${req.body.id} and (estado = 'A' or estado = 'E' or estado = 'N')`;
        conn.query(query, (error, formularios, cols) => {
            if(error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Obtecion de los mensajes exitoso", formularios});
        });
    });

    //a partir de la cita obtener los ID de los usuarios o colaboradores
    app.post('/getInfoContrato', (req, res, next) => {
        let query = `Select * from contratos Where con_id = ${req.body.id}`;
        conn.query(query, (error, formularios, cols) => {
            if(error) res.json({status: 0, message: `${error}`});
            else res.json({status: 1, message: "Obtecion de los mensajes exitoso", formularios});
        });
    });

    app.post('/calificarUsuario', (req,res,next) => {
        let querry = `update usuarios set total_contratos = ${req.body.totalContratos} , total_estrellas = ${req.body.totalEstrellas} where u_id = ${req.body.id}`;
        console.log(querry);
        conn.query(querry, (err, formularios, cols) => {
            if (err) res.json({status: 0, message: `${err}`});  
            else res.json({status: 1, message: "Calificacion Enviada con exito"});
        });
    });

    app.post('/calificarColab', (req,res,next) => {
        let querry = `update colaborador set total_contratos = ${req.body.totalContratos} , total_estrellas = ${req.body.totalEstrellas} where c_id = ${req.body.id}`;
        console.log(querry);
        conn.query(querry, (err, formularios, cols) => {
            if (err) res.json({status: 0, message: `${err}`});  
            else res.json({status: 1, message: "Calificacion Enviada con exito"});
        });
    });

    app.post('/completarContrato', (req, res, next) => {
        let querry =  `Update contratos set estado = 'C' where con_id = ${req.body.id}`;
        conn.query( querry, (error, formularios) => {
            if (error) res.json({status: 0, message: `${error}`});  
            else res.json({status: 1, message: "Se Completo un contrato satisfactoriamente", formularios});

        });

    });
}
