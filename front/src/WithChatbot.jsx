import React from 'react';
import Chatbot from './components/Chatbot'; // Assurez-vous que le chemin est correct

const WithChatbot = ({ children }) => {
    return (
        <>
            {children}
            <Chatbot />
        </>
    );
};

export default WithChatbot;
