import React, { useState, useEffect } from 'react';
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share';
import { useParams } from 'react-router-dom';
import '../styleTodo.css';

export default function ListDetail() {
  const [todoList, setTodoList] = useState(null);
  const [todoItems, setTodoItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await fetch(`http://195.35.29.110:3000/api/todoLists/${id}`);
        const data = await response.json();
        setTodoList(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste:", error);
      }
    };

    fetchTodoList();
  }, [id]);

  useEffect(() => {
    const fetchTodoItems = async () => {
      try {
        const response = await fetch(`http://195.35.29.110:3000/api/todoItems/list/${id}`);
        const itemsData = await response.json();
        setTodoItems(itemsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des items de la liste:", error);
      }
    };

    if (todoList) {
      fetchTodoItems();
    }
  }, [todoList, id]);

  const createShareMessage = () => {
    const itemList = todoItems.map(item => item.name).join(', ');
    return `Voici ma liste de courses: ${itemList}`;
  };

  const shareUrl = 'http://195.35.29.110';
  const shareMessage = createShareMessage();


  return (
    <div className="todo-list-detail">
      {todoList ? (
        <div>
          <h2>{todoList.title}</h2>
          <ul>
            {todoItems.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Chargement de la liste...</p>
      )}
      <div className="share-buttons">
        <FacebookShareButton url={shareUrl} quote={shareMessage}>
          <button>Partager sur Facebook</button>
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={shareMessage}>
          <button>Partager sur Twitter</button>
        </TwitterShareButton>
        <EmailShareButton url={shareUrl} subject="Ma liste de courses" body={shareMessage}>
          <button>Partager par Email</button>
        </EmailShareButton>
        <button onClick={() => handleCopyToClipboard(shareMessage)}>Copier le lien</button>
      </div>
    </div>
  );
}

function handleCopyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert('Message copié dans le presse-papier!'))
    .catch(err => console.error('Erreur lors de la copie: ', err));
}