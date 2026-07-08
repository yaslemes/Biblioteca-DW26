import pool from "../../database/connection.js";

class EmprestimoRepository {
  async create(emprestimo) {
    const {
      usuario_id,
      livro_id,
      data_emprestimo,
      data_prevista_devolucao,
      data_devolucao,
      status,
    } = emprestimo;

    const { rows } = await pool.query(
      `
      INSERT INTO emprestimos
      (
        usuario_id,
        livro_id,
        data_emprestimo,
        data_prevista_devolucao,
        data_devolucao,
        status
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *;
      `,
      [
        usuario_id,
        livro_id,
        data_emprestimo,
        data_prevista_devolucao,
        data_devolucao,
        status,
      ]
    );

    return rows[0];
  }


  async findAll() {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM emprestimos
      ORDER BY id;
      `
    );

    return rows;
  }


  async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM emprestimos
      WHERE id = $1;
      `,
      [id]
    );

    return rows[0];
  }


  async findByIdWithDetails(id) {
    const { rows } = await pool.query(
      `
      SELECT
        e.id,
        e.data_emprestimo,
        e.data_prevista_devolucao,
        e.data_devolucao,
        e.status,

        u.id AS usuario_id,
        u.nome AS usuario,

        l.id AS livro_id,
        l.titulo AS livro

      FROM emprestimos e

      INNER JOIN usuarios u
        ON u.id = e.usuario_id

      INNER JOIN livros l
        ON l.id = e.livro_id

      WHERE e.id = $1;
      `,
      [id]
    );

    return rows[0];
  }


  async update(id, emprestimo) {
    const {
      usuario_id,
      livro_id,
      data_emprestimo,
      data_prevista_devolucao,
      data_devolucao,
      status,
    } = emprestimo;


    const { rows } = await pool.query(
      `
      UPDATE emprestimos
      SET
        usuario_id = COALESCE($1, usuario_id),
        livro_id = COALESCE($2, livro_id),
        data_emprestimo = COALESCE($3, data_emprestimo),
        data_prevista_devolucao = COALESCE($4, data_prevista_devolucao),
        data_devolucao = COALESCE($5, data_devolucao),
        status = COALESCE($6, status)

      WHERE id = $7

      RETURNING *;
      `,
      [
        usuario_id,
        livro_id,
        data_emprestimo,
        data_prevista_devolucao,
        data_devolucao,
        status,
        id,
      ]
    );

    return rows[0];
  }


  async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM emprestimos
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );

    return rows[0];
  }
}

export default EmprestimoRepository;