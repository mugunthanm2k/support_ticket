const express = require('express');
const router = express.Router();
const ticketModel = require('../models/Ticket');

// Get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await ticketModel.getAllTickets();
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get ticket by ID
router.get('/:id', async (req, res) => {
  try {
    const ticket = await ticketModel.getTicketById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new ticket
router.post('/', async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    
    // Validate priority
    const validPriorities = ['Low', 'Medium', 'High'];
    const ticketPriority = validPriorities.includes(priority) ? priority : 'Medium';
    
    const newTicket = await ticketModel.createTicket(title, description, ticketPriority);
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update ticket status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Open', 'In Progress', 'Closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    
    const updatedTicket = await ticketModel.updateTicketStatus(req.params.id, status);
    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    res.json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;