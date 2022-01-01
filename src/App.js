import React from 'react';
import loadingGif from './loading.gif';
import './App.css';
import SearchBar from './Components/SearchBar';
import RepoList from './Components/RepoList';

function App() {
  const [repoList, setRepoList] = React.useState([])
  const [totalCount, setTotalCount] = React.useState(0)
  const [searchText, setSearchText] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const url = 'https://api.github.com/search/repositories'
        const resp = await fetch(`${url}?q=${searchText}`)
        const data = await resp.json()
        setTotalCount(data.total_count)
        setRepoList(data.items)
        console.log('data====',data)
      }catch(ex){
        console.warn(ex)
      }
      setLoading(false)
    }

    searchText!== '' && fetchData()
    
  }, [searchText])
  return (
    <div className="App">
      <h1 className="header">Search Repository in Github</h1>
      <SearchBar onChangeText={value => setSearchText(value)} value={searchText}/>
      {searchText == '' && <p>Please insert the repo name</p>}
      {!!totalCount && <p>There are {totalCount} results.</p>}
      {loading && <img src={loadingGif} width={50}/>}
      <RepoList repoList={repoList}/>
    </div>
  );
}

export default App;
