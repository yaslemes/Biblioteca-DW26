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
      (usuario_id, livro_id, data_emprestimo, data_prevista_devolucao, data_devolucao, status)
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
    const { rows } = await pool.query(`
      SELECT *
      FROM emprestimos
      ORDER BY id;
    `);

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
        u.nome AS usuario,
        l.titulo AS livro,
        e.data_emprestimo,
        e.data_prevista_devolucao,
        e.data_devolucao,
        e.status
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
        usuario_id = $1,
        livro_id = $2,
        data_emprestimo = $3,
        data_prevista_devolucao = $4,
        data_devolucao = $5,
        status = $6
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
    await pool.query(
      `
      DELETE FROM emprestimos
      WHERE id = $1;
      `,
      [id]
    );
  }
}

export default EmprestimoRepository;