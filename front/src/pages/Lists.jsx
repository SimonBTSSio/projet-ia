import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styleTodo.css';

export default function Lists() {
  const [todoLists, setTodoLists] = useState([]);

  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.log("Aucun utilisateur connecté.");
          return;
        }

        const response = await fetch(`http://195.35.29.110:3000/api/todoLists/user/${userId}`);
        const data = await response.json();
        setTodoLists(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des listes:", error);
      }
    };

    fetchTodoLists();
  }, []);

  return (
    <div className="todo-lists">
      <h1>Listes de Courses</h1>
      <ul>
        {todoLists.map(list => (
          <li key={list.id}>
            <Link to={`/list/${list.id}`}>{list.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
