const pool = require('../config/database');

const getAllTickets = async () => {
  try {
    const result = await pool.query('SELECT * FROM tickets ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    console.error('Error getting all tickets:', error);
    throw error;
  }
};

const getTicketById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM tickets WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error getting ticket by ID:', error);
    throw error;
  }
};

const createTicket = async (title, description, priority) => {
  try {
    const result = await pool.query(
      'INSERT INTO tickets (title, description, priority) VALUES ($1, $2, $3) RETURNING *',
      [title, description, priority]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

const updateTicketStatus = async (id, status) => {
  try {
    const result = await pool.query(
      'UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error updating ticket status:', error);
    throw error;
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicketStatus,
};