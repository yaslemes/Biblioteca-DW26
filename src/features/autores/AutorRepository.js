import pool from "../../database/connection.js";

export default class AutorRepository {
  async findAll() {
    const result = await pool.query("SELECT * FROM autores ORDER BY id");
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM autores WHERE id = $1",
      [id]
    );

    return result.rows[0];
  }

  async create(data) {
    const { nome, nacionalidade, data_nascimento } = data;

    const result = await pool.query(
      `INSERT INTO autores (nome, nacionalidade, data_nascimento)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nome, nacionalidade, data_nascimento]
    );

    return result.rows[0];
  }

  async update(id, data) {
    const { nome, nacionalidade, data_nascimento } = data;

    const result = await pool.query(
      `UPDATE autores
       SET nome = $1,
           nacionalidade = $2,
           data_nascimento = $3
       WHERE id = $4
       RETURNING *`,
      [nome, nacionalidade, data_nascimento, id]
    );

    return result.rows[0];
  }

  async delete(id) {
    await pool.query("DELETE FROM autores WHERE id = $1", [id]);
  }

  // Verifica se o autor possui livros vinculados
  async hasBooks(id) {
    const result = await pool.query(
      `SELECT 1
       FROM livros_autores
       WHERE autor_id = $1
       LIMIT 1`,
      [id]
    );

    return result.rowCount > 0;
  }
}