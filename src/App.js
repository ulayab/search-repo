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
  console.log('location', location)

  let page = 1

  async function fetchData({keyword}) {
    setLoading(true)
    try {
console.log('page?', page)

    const url = 'https://api.github.com/search/repositories'
    const query = `${ keyword ? `?q=${keyword}?page=${page}` : ''}`
    const resp = await fetch(`${url}${query}`)
    const data = await resp.json()
    // console.log('data====',data)
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
    fetchData({keyword})
    history.push(`?q=${keyword}`);
  }, 1000)

  function handleScroll (e) {
    let topOfScroll = e.target.documentElement.scrollTop
    let totalHeight = e.target.documentElement.scrollHeight 
    if(topOfScroll + window.innerHeight == totalHeight) {
      console.log('at the bottom !!!!!!!!!!')
      page = page + 1
      // fetchData()
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  },[])

  return (
    <div className="App">
      <h1>Search Repository in Github</h1>
      <button onClick={() => history.push('/home')}>123</button>
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
