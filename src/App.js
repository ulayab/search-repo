import React from 'react';
import debounce from 'lodash.debounce'
import loadingGif from './loading.gif';
import './App.css';
import SearchBar from './Components/SearchBar';
import RepoList from './Components/RepoList';

function App() {
  const [repoList, setRepoList] = React.useState([])
  const [totalCount, setTotalCount] = React.useState(0)
  const [loading, setLoading] = React.useState(false)

async function fetchData(keyword) {
  setLoading(true)
  try {
    const url = 'https://api.github.com/search/repositories'
    const query = `${ keyword ? `?q=${keyword}` : ''}`
    const resp = await fetch(`${url}${query}`)
    const data = await resp.json()
    setTotalCount(data.total_count)
    setRepoList(data.items)
    // console.log('data====',data)
  }catch(ex){
    console.warn(ex)
  }
  setLoading(false)
}

  const debounceSetKeyword = debounce((keyword) => {
    fetchData(keyword)
  }, 1000)

  return (
    <div className="App">
      <h1>Search Repository in Github</h1>
      <SearchBar onSetKeyword={debounceSetKeyword}/>
     
      {!!totalCount && <p>There are {totalCount} results.</p>}
      {loading && <img src={loadingGif} width={50}/>}
      <RepoList repoList={repoList}/>
    </div>
  );
}

export default App;
