import { pool } from '../db.js';

export const getTasks = async (req, res) => { //get
  try {
    const [rows] = await pool.query('SELECT * FROM tasks')
    res.json(rows)
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong :('
    })
  }
}

export const getOneTask = async (req, res) => {
  try {
  const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id])
  if (rows.length <= 0) return res.status(404).json({
    "message": 'task not found'
  })
  res.json(rows[0])
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong'
    })
  }
}

export const createTask = async (req, res) => { //post
  const { name, content } = req.body
  try {
  const [rows] = await pool.query('INSERT INTO tasks (name, content) VALUES (?, ?);', [name, content])
  res.send({
    id: rows.insertId,
    name,
    content
  })
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong'
    })
  }
}

export const deleteTask = async (req, res) => { //delete
  try {
  const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id])
  if (result.affectedRows <= 0) {
    return res.status(404).json({
      message: `task with id ${req.params.id} not found`
    }) 
  } else {
    return res.send(`task with id ${req.params.id} deleted correctly`)
  }
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong'
    })  
  }
}

export const updateTask = async (req, res) => { //put
  const {id} = req.params;
  const {name, content} = req.body;
  
  try {
  const [result] = await pool.query('UPDATE tasks SET name = IFNULL(?, name), content = IFNULL(?, content) WHERE id = ?', [name, content, id])
  if (result.affectedRows === 0) return res.status(404).json({
    message: `task with id ${id} not found`
  })
  const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id])
  res.json(rows[0])
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong'
    })
  }
}

