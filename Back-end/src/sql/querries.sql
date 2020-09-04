create table Cliente (
	Nombre varchar(100),
	Apellido varchar(100),
	Correo varchar(100),
	u_id serial,
	contraseña varchar(100),
	u_foto varchar(200),
	primary key (u_id)
);

create table Colaborador(
	Nombre varchar(100),
	Apellido varchar(100),
	Correo varchar(100),
	c_id serial,
	c_contraseña varchar(100),
	c_foto varchar(200),
	primary key (c_id)
);

create table Contratos(
	f_init timestamp, --timestamp format: YYYY-MM-DD HH:MM:SS
	f_end timestamp,
	con_id serial,
	u_id int,
	c_id int,
	primary key( con_id),
	foreign key (u_id) references cliente(u_id),
	foreign key (c_id) references colaborador(c_id)
);

create table etiquetas(
	e_id serial,
	e_Nombre varchar(100),
	descripcion varchar(240),
	primary key (e_id)
);

create table relacion_etiquetas_y_colab(
	c_id int,
	e_id int,
	primary key (c_id, e_id),
	foreign key (c_id) references colaborador(c_id),
	foreign key (e_id) references etiquetas(e_id)
);

create table mensajes(
    m_id serial,
    con_id int,
    sendBy boolean,
    content varchar(240),
    fecha timestamp,
    primary key (m_id),
    foreign key (con_id) references Contratos(con_id)
)

