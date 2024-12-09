import React, { useEffect } from 'react';

const Modal = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();  // Automatically close the modal after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);  // Cleanup on component unmount
  }, [onClose]);
  
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full transform transition-all duration-500 ease-in-out opacity-0 scale-95 animate-modal">
        <p className="text-center text-lg">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
