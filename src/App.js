import React from 'react';
import debounce from 'lodash.debounce'
import loadingGif from './loading.gif';
import './App.css';
import SearchBar from './Components/SearchBar';
import RepoList from './Components/RepoList';

function App() {
  const [repoList, setRepoList] = React.useState([])
  const [totalCount, setTotalCount] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

async function fetchData(keyword) {
  setLoading(true)
  try {
    const url = 'https://api.github.com/search/repositories'
    const query = `${ keyword ? `?q=${keyword}` : ''}`
    const resp = await fetch(`${url}${query}`)
    const data = await resp.json()
    console.log('data====',data)
    if(data.items) {
      setTotalCount(data.total_count)
      setRepoList(data.items)
    } else {
      setTotalCount(null)
      setRepoList([])
    }
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
        {console.log('total count', totalCount)}
      {totalCount === 0 && <p>No matches were found.</p>}
      {!!totalCount && <p>{totalCount} results were found.</p>}

      {loading && <img src={loadingGif} width={50}/>}
      <RepoList repoList={repoList}/>
    </div>
  );
}

export default App;
