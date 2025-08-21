import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTickets } from '../context/TicketContext';
import Header from '../components/Header';

const TicketDetail = () => {
  const { id } = useParams();
  const { tickets, updateTicketStatus } = useTickets();
  const navigate = useNavigate();
  
  const ticket = tickets.find(t => t.id === parseInt(id));

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Ticket Not Found" showBack={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">Ticket not found.</p>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get priority color classes
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-l-4 border-red-500';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-l-4 border-blue-500';
      default:
        return 'bg-gray-100 text-gray-800 border-l-4 border-gray-500';
    }
  };

  // Get status color classes
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await updateTicketStatus(ticket.id, newStatus);
    } catch (error) {
      console.error('Error updating ticket status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Ticket Details" showBack={true} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-lg p-6 mb-6 shadow-md shadow-cyan-500/50">
            {/* Header with priority indicator */}
            <div className={`${getPriorityColor(ticket.priority)} rounded-t-lg -mx-6 -mt-6 p-4 mb-6`}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold uppercase tracking-wide">
                  {ticket.priority} Priority
                </span>
                <span className="text-sm font-medium">
                  #{ticket.id}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{ticket.title}</h2>
              <span className={`${getStatusColor(ticket.status)} px-3 py-1 rounded-md text-sm font-medium`}>
                {ticket.status}
              </span>
            </div>
            
            <div className="mb-6 text-sm text-gray-500">
              Created: {formatDate(ticket.created_at)}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
            </div>
            
            <div className="flex space-x-3 pt-4 border-t border-gray-100">
              {ticket.status === 'Open' && (
                <button
                  onClick={() => handleStatusChange('In Progress')}
                  className="px-4 py-2 shadow-sm shadow-cyan-500/50 hover:shadow-md text-sm rounded-md bg-gray-50 text-black border border-gray-300 hover:bg-green-600 hover:text-white"
                >
                  Mark as In Progress
                </button>
              )}
              {ticket.status === 'In Progress' && (
                <>
                  <button
                    onClick={() => handleStatusChange('Open')}
                    className="px-4 py-2 text-sm rounded-md shadow-sm shadow-cyan-500/50 hover:shadow-md bg-gray-50 text-black border border-gray-300 hover:bg-green-600 hover:text-white"
                  >
                    Mark as Open
                  </button>
                  <button
                    onClick={() => handleStatusChange('Closed')}
                    className="px-4 py-2 text-sm rounded-md shadow-sm shadow-cyan-500/50 hover:shadow-md bg-gray-50 text-black border border-gray-300 hover:bg-green-600 hover:text-white"
                  >
                    Mark as Closed
                  </button>
                </>
              )}
              {ticket.status === 'Closed' && (
                <>
                  <button
                    onClick={() => handleStatusChange('Open')}
                    className="px-4 py-2 text-sm rounded-md shadow-sm shadow-cyan-500/50 hover:shadow-md bg-gray-50 text-black border border-gray-300 hover:bg-green-600 hover:text-white"
                  >
                    Reopen
                  </button>
                  <button
                    onClick={() => handleStatusChange('In Progress')}
                    className="px-4 py-2 text-sm rounded-md shadow-sm shadow-cyan-500/50 hover:shadow-md bg-gray-50 text-black border border-gray-300 hover:bg-green-600 hover:text-white"
                  >
                    Mark as In Progress
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;