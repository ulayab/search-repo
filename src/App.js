import React from 'react';
import debounce from 'lodash.debounce'
import { useHistory, useLocation } from "react-router-dom";
import loadingGif from './loading.gif';
import './App.css';
import SearchBar from './Components/SearchBar';
import RepoList from './Components/RepoList';

function App() {
  const [repoList, setRepoList] = React.useState([])
  const [totalCount, setTotalCount] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const history = useHistory();
  let location = useLocation();
  let search = location.search.substring(3) // split `?q=`

  let page = 1
  async function fetchData() {
    setLoading(true)
    try {
    const url = 'https://api.github.com/search/repositories'
    const query = `?q=${search}?page=${page}`
    const resp = await fetch(`${url}${query}`)
    const data = await resp.json()
    if(!data.items || !search || search === "") {
      setTotalCount(null)
      setRepoList([])
    } else {
      let new_items = []
      data.items.forEach(item => new_items.push(item))
      setTotalCount(data.total_count)
      setRepoList(prevRepoList => [...prevRepoList, ...new_items])
    }
  }catch(ex){
    console.warn(ex)
  }
  setLoading(false)
}

  const debounceSetKeyword = debounce((keyword) => {
    history.push(`?q=${keyword}`);
  }, 1000)

  function handleScroll (e) {
    let topOfScroll = e.target.documentElement.scrollTop
    let totalHeight = e.target.documentElement.scrollHeight 
    if(topOfScroll + window.innerHeight == totalHeight) {
      page = page + 1
      fetchData({keyword: search})
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  },[])

  React.useEffect(() => {
    fetchData()
  },[search])


  return (
    <div className="App">
      <h1>Search Repository in Github</h1>
      <button onClick={() => history.push('/home')}>123</button>
      <SearchBar onSetKeyword={debounceSetKeyword}/>
      {totalCount === 0 && <p>No matches were found.</p>}
      {!!totalCount && <p>{totalCount} results were found.</p>}

      <RepoList repoList={repoList}/>
      {loading && <img src={loadingGif} width={50}/>}
    </div>
  );
}

export default App;
