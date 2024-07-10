CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(100) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    area_interesse VARCHAR(100) NOT NULL,
    motivacao TEXT NOT NULL,
    publicar_perfil BOOLEAN NOT NULL
    id_customizacoes INTEGER REFERENCES customizacoes(id)
);

CREATE TABLE organizacoes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(20) NOT NULL,
    area_interesse VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(100) NOT NULL,
    site VARCHAR(150),
    objetivo TEXT NOT NULL,
    id_usuarios INTEGER REFERENCES usuarios(id)
);

CREATE TABLE publicacoes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    conteudo TEXT NOT NULL,
    anexos TEXT,
    id_usuarios INTEGER REFERENCES usuarios(id),
    id_organizacoes INTEGER REFERENCES organizacoes(id)
);

CREATE TABLE oportunidades (
    id SERIAL PRIMARY KEY,
    qtd_vagas INTEGER NOT NULL,
    descricao TEXT NOT NULL,
    area_interesse VARCHAR(100) NOT NULL,
    data_abertura DATE NOT NULL,
    data_encerramento DATE NOT NULL,
    obs VARCHAR(100) NOT NULL,
    id_usuarios INTEGER REFERENCES usuarios(id),
    id_organizacoes INTEGER REFERENCES organizacoes(id)
);

CREATE TABLE inscricoes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    objetivo TEXT NOT NULL,
    link TEXT,
    id_usuarios INTEGER REFERENCES usuarios(id),
    id_oportunidades INTEGER REFERENCES oportunidades(id)
);

CREATE TABLE customizacoes (
    id SERIAL PRIMARY KEY,
    rosto_acessorio TEXT NOT NULL,
    cabeca_acessorio TEXT NOT NULL,
    pernas_acessorio TEXT NOT NULL
);