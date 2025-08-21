import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TicketContext = createContext();

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = 'http://localhost:5000/api';

  // Create axios instance with default config
  const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await api.get('/tickets');
      setTickets(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setLoading(false);
    }
  };

  const createTicket = async (ticketData) => {
    try {
      const response = await api.post('/tickets', ticketData);
      setTickets(prev => [response.data, ...prev]);
      return response.data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  };

  const updateTicketStatus = async (id, status) => {
    try {
      const response = await api.put(`/tickets/${id}`, { status });
      setTickets(prev => 
        prev.map(ticket => ticket.id === id ? response.data : ticket)
      );
      return response.data;
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw error;
    }
  };

  const value = {
    tickets,
    loading,
    fetchTickets,
    createTicket,
    updateTicketStatus,
  };

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
};