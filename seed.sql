TRUNCATE TABLE
emprestimos,
livros_autores,
livros,
categorias,
autores,
enderecos,
usuarios
RESTART IDENTITY CASCADE;

INSERT INTO categorias (nome)
VALUES
('Romance'),
('Ficção Científica'),
('Terror'),
('História'),
('Infantil');

INSERT INTO autores (nome, nacionalidade, data_nascimento)
VALUES
('Machado de Assis','Brasileiro','1839-06-21'),
('J. K. Rowling','Britânica','1965-07-31'),
('George Orwell','Britânico','1903-06-25'),
('Monteiro Lobato','Brasileiro','1882-04-18'),
('Stephen King','Americano','1947-09-21');

INSERT INTO usuarios (nome, email, cpf, telefone)
VALUES
('João Silva','joao@email.com','111.111.111-11','(44)99999-1111'),
('Maria Oliveira','maria@email.com','222.222.222-22','(44)99999-2222'),
('Carlos Souza','carlos@email.com','333.333.333-33','(44)99999-3333'),
('Ana Costa','ana@email.com','444.444.444-44','(44)99999-4444'),
('Fernanda Lima','fernanda@email.com','555.555.555-55','(44)99999-5555');

INSERT INTO enderecos
(usuario_id, rua, numero, bairro, cidade, estado, cep)
VALUES
(1, 'Rua das Flores', '120', 'Centro', 'Campo Mourão', 'PR', '87300-000'),
(2, 'Av. Brasil', '450', 'Jardim América', 'Campo Mourão', 'PR', '87301-000'),
(3, 'Rua Paraná', '80', 'Lar Paraná', 'Campo Mourão', 'PR', '87305-000'),
(4, 'Rua Santos Dumont', '350', 'Centro', 'Campo Mourão', 'PR', '87302-000'),
(5, 'Rua Curitiba', '98', 'Jardim Aeroporto', 'Campo Mourão', 'PR', '87308-000');

INSERT INTO livros
(titulo, isbn, editora, ano_publicacao, categoria_id, quantidade_total, quantidade_disponivel)
VALUES
('Dom Casmurro','9788535914849','Ática',1899,1,5,4),
('Harry Potter e a Pedra Filosofal','9788532511010','Rocco',1997,2,8,6),
('1984','9788535914840','Companhia das Letras',1949,2,4,2),
('O Sítio do Picapau Amarelo','9788525044648','Globo',1920,5,6,6),
('O Iluminado','9788581050485','Suma',1977,3,3,1);

INSERT INTO livros_autores (livro_id, autor_id)
VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);

INSERT INTO emprestimos
(usuario_id, livro_id, data_emprestimo, data_prevista_devolucao, data_devolucao, status)
VALUES
(1,1,'2026-07-01','2026-07-15',NULL,'EMPRESTADO'),
(2,2,'2026-06-25','2026-07-10',NULL,'EMPRESTADO'),
(3,3,'2026-06-01','2026-06-20',NULL,'ATRASADO'),
(4,5,'2026-06-28','2026-07-08',NULL,'EMPRESTADO'),
(5,4,'2026-06-01','2026-06-15','2026-06-14','DEVOLVIDO');