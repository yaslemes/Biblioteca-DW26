import pool from "../../database/connection.js";

class LivroRepository {
  async create(livro) {
    const {
      titulo,
      isbn,
      editora,
      ano_publicacao,
      categoria_id,
      quantidade_total,
      quantidade_disponivel,
    } = livro;

    const query = `
      INSERT INTO livros
      (titulo, isbn, editora, ano_publicacao, categoria_id, quantidade_total, quantidade_disponivel)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *;
    `;

    const values = [
      titulo,
      isbn,
      editora,
      ano_publicacao,
      categoria_id,
      quantidade_total,
      quantidade_disponivel,
    ];

    const { rows } = await pool.query(query, values);

    return rows[0];
  }

  async findAll() {
    const { rows } = await pool.query(`
      SELECT *
      FROM livros
      ORDER BY id;
    `);

    return rows;
  }

  async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM livros
      WHERE id = $1;
      `,
      [id]
    );

    return rows[0];
  }

  async update(id, livro) {
    const {
      titulo,
      isbn,
      editora,
      ano_publicacao,
      categoria_id,
      quantidade_total,
      quantidade_disponivel,
    } = livro;

    const { rows } = await pool.query(
      `
      UPDATE livros
      SET
        titulo = $1,
        isbn = $2,
        editora = $3,
        ano_publicacao = $4,
        categoria_id = $5,
        quantidade_total = $6,
        quantidade_disponivel = $7
      WHERE id = $8
      RETURNING *;
      `,
      [
        titulo,
        isbn,
        editora,
        ano_publicacao,
        categoria_id,
        quantidade_total,
        quantidade_disponivel,
        id,
      ]
    );

    return rows[0];
  }

  async delete(id) {
    await pool.query(
      `
      DELETE FROM livros
      WHERE id = $1;
      `,
      [id]
    );
  }

  async addAutor(livroId, autorId) {
    const { rows } = await pool.query(
      `
      INSERT INTO livros_autores (livro_id, autor_id)
      VALUES ($1, $2)
      RETURNING *;
      `,
      [livroId, autorId]
    );

    return rows[0];
  }

  async findAllWithDetails() {
    const { rows } = await pool.query(`
      SELECT
        l.id,
        l.titulo,
        l.isbn,
        l.editora,
        l.ano_publicacao,
        c.nome AS categoria,
        STRING_AGG(a.nome, ', ') AS autores,
        l.quantidade_total,
        l.quantidade_disponivel
      FROM livros l
      JOIN categorias c
        ON l.categoria_id = c.id
      JOIN livros_autores la
        ON la.livro_id = l.id
      JOIN autores a
        ON a.id = la.autor_id
      GROUP BY
        l.id,
        l.titulo,
        l.isbn,
        l.editora,
        l.ano_publicacao,
        c.nome,
        l.quantidade_total,
        l.quantidade_disponivel
      ORDER BY l.id;
    `);

    return rows;
  }

  async decreaseQuantidadeDisponivel(id) {
    const { rows } = await pool.query(
      `
      UPDATE livros
      SET quantidade_disponivel = quantidade_disponivel - 1
      WHERE id = $1
        AND quantidade_disponivel > 0
      RETURNING *;
      `,
      [id]
    );

    return rows[0];
  }

  async increaseQuantidadeDisponivel(id) {
    const { rows } = await pool.query(
      `
      UPDATE livros
      SET quantidade_disponivel = quantidade_disponivel + 1
      WHERE id = $1
        AND quantidade_disponivel < quantidade_total
      RETURNING *;
      `,
      [id]
    );

    return rows[0];
  }

  async hasEmprestimoAtivo(id) {
    const { rows } = await pool.query(
      `
      SELECT id
      FROM emprestimos
      WHERE livro_id = $1
        AND status = 'EMPRESTADO'
      LIMIT 1;
      `,
      [id]
    );

    return rows.length > 0;
  }
}

export default LivroRepository;