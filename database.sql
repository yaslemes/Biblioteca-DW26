-- ============================================================
-- DATABASE
-- ============================================================

-- Database: biblioteca_db

-- DROP DATABASE IF EXISTS biblioteca_db;

CREATE DATABASE biblioteca_db
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = FALSE;

-- ============================================================
-- TABELAS
-- ============================================================

DROP TABLE IF EXISTS emprestimos CASCADE;
DROP TABLE IF EXISTS livros_autores CASCADE;
DROP TABLE IF EXISTS enderecos CASCADE;
DROP TABLE IF EXISTS livros CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS autores CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- ============================================================
-- USUÁRIOS
-- ============================================================

CREATE TABLE usuarios (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- ENDEREÇOS (1:1)
-- ============================================================

CREATE TABLE enderecos (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    usuario_id INTEGER NOT NULL UNIQUE,

    rua VARCHAR(150) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL,
    cep VARCHAR(20) NOT NULL,

    CONSTRAINT fk_endereco_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

-- ============================================================
-- AUTORES
-- ============================================================

CREATE TABLE autores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(80),
    data_nascimento DATE
);

-- ============================================================
-- CATEGORIAS
-- ============================================================

CREATE TABLE categorias (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(80) NOT NULL UNIQUE
);

-- ============================================================
-- LIVROS
-- ============================================================

CREATE TABLE livros (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    titulo VARCHAR(150) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    editora VARCHAR(100),
    ano_publicacao INTEGER,

    categoria_id INTEGER NOT NULL,

    quantidade_total INTEGER NOT NULL,
    quantidade_disponivel INTEGER NOT NULL,

    CONSTRAINT fk_livros_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id),

    CONSTRAINT chk_quantidade
        CHECK (
            quantidade_total >= 0
            AND quantidade_disponivel >= 0
            AND quantidade_disponivel <= quantidade_total
        )
);

-- ============================================================
-- LIVROS x AUTORES (N:N)
-- ============================================================

CREATE TABLE livros_autores (

    livro_id INTEGER NOT NULL,
    autor_id INTEGER NOT NULL,

    PRIMARY KEY (livro_id, autor_id),

    CONSTRAINT fk_livro
        FOREIGN KEY (livro_id)
        REFERENCES livros(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_autor
        FOREIGN KEY (autor_id)
        REFERENCES autores(id)
        ON DELETE CASCADE
);

-- ============================================================
-- EMPRÉSTIMOS
-- ============================================================

CREATE TABLE emprestimos (

    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    usuario_id INTEGER NOT NULL,
    livro_id INTEGER NOT NULL,

    data_emprestimo DATE NOT NULL,
    data_prevista_devolucao DATE NOT NULL,
    data_devolucao DATE,

    status VARCHAR(20) NOT NULL,

    CONSTRAINT fk_emprestimos_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    CONSTRAINT fk_emprestimos_livro
        FOREIGN KEY (livro_id)
        REFERENCES livros(id),

    CONSTRAINT chk_status
        CHECK (
            status IN (
                'EMPRESTADO',
                'DEVOLVIDO',
                'ATRASADO'
            )
        ),

    CONSTRAINT chk_datas_emprestimos
        CHECK (
            data_prevista_devolucao >= data_emprestimo
        )
);