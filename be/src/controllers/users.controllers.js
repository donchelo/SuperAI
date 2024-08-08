import { pool } from "../config/db.js";

export const getUsuarios = async (req, res) => {
    try {
      const response = await pool.query('SELECT * FROM usuario');
      res.json(response.rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }

export const getUsuario = async  (req, res) => {
    try{
      const {id} = req.params
      const { rows } = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
        if (rows.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(rows[0]);
    }  
    catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }

export const deleteUsuario = async (req, res) => {
    try {
      const {id} = req.params
      const {rowCount} = await pool.query(`DELETE FROM usuario WHERE id = ${id} RETURNING *`);
      if (rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.sendStatus(204);
      
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
    }

export const createUsuario = async (req, res) => {
    try {
      const { nombre, apellido, email, password_hash, rol, fecha_registro, ultimo_acceso } = req.body;
      const { rows } = await pool.query(
        'INSERT INTO usuario (nombre, apellido, email, password_hash , rol, fecha_registro, ultimo_acceso) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [nombre, apellido, email, password_hash, rol, fecha_registro, ultimo_acceso]
      );
      res.json(rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }


export const updateUsuario = async (req, res) => {
    try {
      const {id} = req.params
      const { nombre, apellido, email, password_hash, rol, fecha_registro, ultimo_acceso } = req.body;
      const { rows } = await pool.query(
        `UPDATE usuario SET nombre = $1, apellido = $2, email = $3, password_hash = $4, rol = $5, fecha_registro = $6, ultimo_acceso = $7 WHERE id = ${id} RETURNING *`,
        [nombre, apellido, email, password_hash, rol, fecha_registro, ultimo_acceso]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
    }