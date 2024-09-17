CREATE DATABASE Help_Desk;

USE Help_Desk;

CREATE TABLE usuarios(
	codigo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(60) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    situacao INT NOT NULL,
    tipo ENUM('cliente','suporte','admin') NOT NULL,
    PRIMARY KEY(codigo)
);

CREATE TABLE tickets (
	codigo INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    descricao VARCHAR(70) NOT NULL,
    estado_codigo INT NOT NULL,
    data_criacao DATE NOT NULL,
    data_termino DATE NULL,
    cliente_codigo INT NOT NULL,
    suporte_codigo INT NULL,
    gravidade_codigo INT NOT NULL,
    categoria_codigo INT NOT NULL,
    
    PRIMARY KEY (codigo),
    FOREIGN KEY (estado_codigo) REFERENCES estados(codigo),
    FOREIGN KEY (gravidade_codigo) REFERENCES gravidades(codigo),
    FOREIGN KEY (categoria_codigo) REFERENCES categorias(codigo),
    FOREIGN KEY (cliente_codigo) REFERENCES usuarios(codigo),
    FOREIGN KEY (suporte_codigo) REFERENCES usuarios(codigo)
);

CREATE TABLE mensagens (
	codigo INT NOT NULL AUTO_INCREMENT,
    ticket_codigo INT,
    usuario_codigo INT,
    conteudo VARCHAR(70) NOT NULL,
    data_criacao DATE NOT NULL,
    
    PRIMARY KEY (codigo),
    FOREIGN KEY (ticket_codigo) REFERENCES tickets(codigo),
    FOREIGN KEY (usuario_codigo) REFERENCES usuarios(codigo)
);
    
CREATE TABLE estados (
	codigo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50),
    
	PRIMARY KEY (codigo)
);

CREATE TABLE gravidades (
	codigo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50),
    
    PRIMARY KEY (codigo)
);

CREATE TABLE categorias (
	codigo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50),
    situacao INT NOT NULL,
    PRIMARY KEY (codigo)
);

/*Inserindo estado*/
INSERT INTO estados (nome) VALUES ('aberto');
INSERT INTO estados (nome) VALUES ('andamento');
INSERT INTO estados (nome) VALUES ('concluído');
INSERT INTO estados (nome) VALUES ('fechado');

/*Inserindo gravidade*/
INSERT INTO gravidades (nome) VALUES ('baixo');
INSERT INTO gravidades (nome) VALUES ('médio');
INSERT INTO gravidades (nome) VALUES ('alto');


/*Inserindo o admin padrão*/
INSERT INTO usuarios (nome, email, senha, telefone, situacao, tipo) VALUES ('Admin', 'admin@email.com', '5389', '(11) 9343653708', 1, 'admin');
