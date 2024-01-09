import React, { useState, useEffect } from 'react';
import '../Chatbot.css';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const promptInitial = "Mets toi dans la peau d'un chef étoilé au guide Michelin ayant une quinzaine d'années d'expérience dans le métier avec plusieurs concours culinaires gagnés à l'international et réponds à la demande suivante : ";

    useEffect(() => {
        const initialMessage = {
            role: 'bot',
            content: "Bonjour, comment puis-je vous aider ?"
        };
        setMessages([initialMessage]);
    }, []);

    const handleSend = async () => {
        const newUserMessage = { role: 'user', content: userInput };
        setMessages(messages => [...messages, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const conversation = messages.map(m => `${m.role === 'user' ? 'Utilisateur:' : 'Chef étoilé:'} ${m.content}`).join(' / ');
            const questionTotale = promptInitial + conversation + ` / Utilisateur: ${newUserMessage.content}`;
            const response = await fetch(`http://195.35.29.110:3000/chat-bot?question=${encodeURIComponent(questionTotale)}`);
            const data = await response.json();

            if (data && data.length > 0) {
                const botMessage = { role: 'bot', content: data[0].message.content };
                setMessages(messages => [...messages, botMessage]);
            }
        } catch (error) {
            console.error("Erreur lors de l'interaction avec le chat-bot:", error);
        }
        setIsLoading(false);
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            <div className="chatbot-header" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Fermer le Chat' : 'Ouvrir le Chat'}
            </div>
            {isOpen && (
                <div className="chatbot-body">
                    <div className="messages-container">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.role}`}>
                                {message.content}
                            </div>
                        ))}
                    </div>
                    <div className="user-input-container">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Votre question..."
                            disabled={isLoading} // Désactiver pendant le chargement
                        />
                        <button onClick={handleSend} disabled={isLoading}>Envoyer</button>
                    </div>
                </div>
            )}
        </div>
    );
}
