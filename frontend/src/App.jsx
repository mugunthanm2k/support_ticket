import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TicketProvider } from './context/TicketContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateTicket from './pages/CreateTicket';
import ViewTickets from './pages/ViewTickets';

function App() {
  return (
    <TicketProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-ticket" element={<CreateTicket />} />
            <Route path="/ticket/:id" element={<ViewTickets />} />
          </Routes>
        </div>
      </Router>
    </TicketProvider>
  );
}

export default App;