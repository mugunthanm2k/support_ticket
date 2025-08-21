import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import Header from '../components/Header';
import TicketGrid from '../components/TicketGrid';
import { FaCheck, FaClock } from 'react-icons/fa';

const Dashboard = () => {
  const { tickets, loading } = useTickets();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');

  const openTickets = tickets.filter(ticket => ticket.status === 'Open').length;
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'In Progress').length;
  const closedTickets = tickets.filter(ticket => ticket.status === 'Closed').length;

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'All Priority' || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Support Dashboard" />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Support Dashboard" />

      <div className="container mx-auto lg:px-[10%] py-4 px-4">
        {/* Stats Overview - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md shadow-cyan-500/50 p-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100 mr-3">
                <FaCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Open {openTickets}</h3>
                <p className="text-sm text-gray-600">Tickets awaiting response</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md shadow-cyan-500/50 p-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-yellow-100 mr-3">
                <FaClock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">In Progress {inProgressTickets}</h3>
                <p className="text-sm text-gray-600">Tickets being worked on</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md shadow-cyan-500/50 p-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gray-100 mr-3">
                <FaCheck className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Closed {closedTickets}</h3>
                <p className="text-sm text-gray-600">Resolved tickets</p>
              </div>
            </div>
          </div>
        </div>
        {/* Filters and search - Single Line */}
        <div className="bg-white rounded-lg shadow-md shadow-cyan-500/50 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option>All Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option>All Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        {/* Ticket Grid */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            All Tickets ({filteredTickets.length})
          </h3>

          <TicketGrid tickets={filteredTickets} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;