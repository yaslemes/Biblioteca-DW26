import pool from "../../database/connection.js";

export default class UsuarioRepository {
  async findAll() {
    const result = await pool.query(
      "SELECT * FROM usuarios ORDER BY id"
    );

    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE id = $1",
      [id]
    );

    return result.rows[0];
  }

  async findByEmail(email) {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    return result.rows[0];
  }

  async findByCpf(cpf) {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE cpf = $1",
      [cpf]
    );

    return result.rows[0];
  }

  async create(data) {
    const { nome, email, cpf, telefone } = data;

    const result = await pool.query(
      `INSERT INTO usuarios (nome, email, cpf, telefone)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nome, email, cpf, telefone]
    );

    return result.rows[0];
  }

  async update(id, data) {
    const { nome, email, cpf, telefone } = data;

    const result = await pool.query(
      `UPDATE usuarios
       SET nome = $1,
           email = $2,
           cpf = $3,
           telefone = $4
       WHERE id = $5
       RETURNING *`,
      [nome, email, cpf, telefone, id]
    );

    return result.rows[0];
  }

  async delete(id) {
    await pool.query(
      "DELETE FROM usuarios WHERE id = $1",
      [id]
    );
  }
}