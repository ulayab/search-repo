import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './Components/SearchBar';
import RepoList from './Components/RepoList';

function App() {
  const [repoList, setRepoList] = React.useState([])
  const [searchText, setSearchText] = React.useState('')

  return (
    <div className="App">
      <h1>Search Repository in Github</h1>
      <SearchBar onChangeText={value => setSearchText(value)} value={searchText}/>
      <RepoList repoList={repoList}/>
    </div>
  );
}

export default App;
