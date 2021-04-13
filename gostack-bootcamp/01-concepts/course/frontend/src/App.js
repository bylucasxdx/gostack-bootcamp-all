import React, { useState, useEffect } from 'react';
import api from './services/api';
import Header from './components/Header'

/**
 * Componente
 * Propriedades
 * Estado
 */
import './App.css';

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then((response) => {
            setProjects(response.data);
        })
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: 'Lucas Medeiros'
        });
    
        setProjects([...projects, response.data])
    }

    return (
        <>
            <Header title="Subtitulo" />

            <ul>
                {projects.map((project => <li key={project.id}>{project.title}</li>))}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    )
}

export default App;