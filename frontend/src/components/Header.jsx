import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft,FaPlus } from 'react-icons/fa';
const Header = ({ title, showBack = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show create button on these pages
  const hideCreateButton = ['/create-ticket', '/login'].includes(location.pathname);

  return (
    <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft className="h-6 w-6" />
            </button>
          )}
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>

        {!hideCreateButton && (
          <button
  onClick={() => navigate('/create-ticket')}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
>
  <FaPlus className="h-5 w-5 mr-2" />
  Create Ticket
</button>
        )}
      </div>
    </header>
  );
};

export default Header;