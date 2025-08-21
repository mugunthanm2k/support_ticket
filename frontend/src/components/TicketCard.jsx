import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../context/TicketContext';

const TicketCard = ({ ticket }) => {
  const navigate = useNavigate();
  const { updateTicketStatus } = useTickets();

  const handleStatusChange = async (newStatus) => {
    try {
      await updateTicketStatus(ticket.id, newStatus);
    } catch (error) {
      console.error('Error updating ticket status:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusButton = () => {
    switch (ticket.status) {
      case 'Open':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange('In Progress');
            }}
            className="px-3 py-1 w-full bg-gray-50 text-black border border-gray-300 hover:bg-green-600 hover:text-white text-xs rounded transition-colors"
          >
            Mark as In Progress
          </button>
        );
      case 'In Progress':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange('Closed');
            }}
            className="px-3 py-1 bg-gray-50 w-full text-black border border-gray-300 text-xs rounded hover:bg-green-600 hover:text-white transition-colors"
          >
            Mark as Closed
          </button>
        );
      case 'Closed':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange('Open');
            }}
            className="px-3 py-1 bg-gray-50 w-full text-black border border-gray-300 text-xs rounded hover:bg-green-600 hover:text-white transition-colors"
          >
            Reopen Ticket
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm shadow-cyan-500/50 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full">
      {/* Clickable content area */}
      <div 
        className="flex-grow"
        onClick={() => navigate(`/ticket/${ticket.id}`)}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-base font-semibold text-gray-800 line-clamp-2">{ticket.title}</h3>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            ticket.priority === 'High' 
              ? 'bg-red-100 text-red-800' 
              : ticket.priority === 'Medium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {ticket.priority}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {ticket.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            ticket.status === 'Open' 
              ? 'bg-green-100 text-green-800' 
              : ticket.status === 'In Progress'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {ticket.status}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(ticket.created_at)} • #{ticket.id}
          </span>
        </div>
      </div>
      
      {/* Button positioned at the bottom */}
      <div className="pt-3 border-t border-gray-100 mt-auto">
        {getStatusButton()}
      </div>
    </div>
  );
};

export default TicketCard;