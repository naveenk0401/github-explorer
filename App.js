import React, { useState } from 'react';
import './App.css';

function App() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [repoInfo, setRepoInfo] = useState(null);

  const searchRepository = async () => {
    try {
      const response = await fetch(`/api/repositories/${owner}/${repo}`);
      const data = await response.json();
      setRepoInfo(data);
    } catch (error) {
      console.error('Error searching repository:', error);
      setRepoInfo(null);
    }
  };

  return (
    <div className="App">
      <h1>GitHub Explorer</h1>
      <label>
        Owner:
        <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} />
      </label>
      <label>
        Repository:
        <input type="text" value={repo} onChange={(e) => setRepo(e.target.value)} />
      </label>
      <button onClick={searchRepository}>Search</button>

      {repoInfo && (
        <div>
          <h2>Repository Information</h2>
          <p><strong>Name:</strong> {repoInfo.name}</p>
          <p><strong>Description:</strong> {repoInfo.description}</p>
          <p><strong>Stars:</strong> {repoInfo.stargazers_count}</p>
          <p><strong>Language:</strong> {repoInfo.language}</p>
          <p><strong>URL:</strong> <a href={repoInfo.html_url} target="_blank" rel="noopener noreferrer">{repoInfo.html_url}</a></p>
        </div>
      )}
    </div>
  );
}

export default App;
