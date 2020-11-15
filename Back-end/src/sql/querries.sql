create table Usuarios (
	u_id serial,
	Nombre varchar(100),
	Apellido varchar(100),
	Correo varchar(100) unique,
	contraseña varchar(100),
	telefono varchar(50),
	total_contratos integer,
	total_estrellas integer,
	ubicacion varchar(300),
	u_foto varchar(200),
	primary key (u_id),
	unique(Correo)
);

create table Colaborador(
	c_id serial,
	Nombre varchar(100),
	Apellido varchar(100),
	Correo varchar(100),
	c_contraseña varchar(100),
	telefono varchar(50),
	total_contratos integer,
	total_estrellas integer,
	c_foto varchar(200),
	ubicacion varchar(200),
	estado char,
	primary key (c_id),
	unique(Correo)
);

create table Administrador (
	a_id serial,
	Nombre varchar(100),
	Correo varchar(100),
	contraseña varchar(100),
	primary key (a_id),
	unique(Correo)
);

create table Contratos(
	con_id serial,
	f_init timestamp, --timestamp format: YYYY-MM-DD HH:MM:SS
	f_end timestamp,
	u_id int,
	c_id int,
	direccion varchar(250),
	estado char,
	descripcion varchar(300),
	primary key( con_id),
	foreign key (u_id) references usuarios(u_id),
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
);

------- indexes ------------
create index idx_con on mensajes("con_id");



//total de tablas 6

