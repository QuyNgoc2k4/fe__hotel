import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-8">
                <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
                <p className="mt-4 text-2xl font-semibold text-gray-600">Oops! Page not found</p>
                <p className="mt-2 text-lg text-gray-500">
                    The page you’re looking for doesn’t exist.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-8 px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none"
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default NotFound;
