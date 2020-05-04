import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

function App() {
  //const [projects, setProjects] = useState([]);
  const [repositories, setRepositories] = useState([]);
  //const repositories = [];

  /* useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    });
  }, []); */

  async function handleAddRepository() {
    /* const repository = {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"]
    } */

    const response = await api.post("projects", {
      title: "Desafio ReactJS",
      owner: "Francisco",
    });

    /* const project = response.data; 
    setRepositories([...projects, project]); */

    const repository = response.data; 
    setRepositories([...repositories, repository]);
  }
  
  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    repositories.splice(repositoryIndex, 1);
    setRepositories([...repositories]);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <div>
              {<button data-testid="remover"
                onClick={(repositoryId) => handleRemoveRepository(repository.id)}>
                Remover
              </button>}
            </div>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
