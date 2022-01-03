import React from 'react';
import debounce from 'lodash.debounce'
import styled from 'styled-components';
import { useHistory, useLocation } from "react-router-dom";
import loadingGif from './loading.gif';
import './App.css';
import SearchBar from './Components/SearchBar';
import RepoList from './Components/RepoList';

function App() {
  const [repoList, setRepoList] = React.useState([])
  const [totalCount, setTotalCount] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const history = useHistory();
  let location = useLocation();
  let search = location.search.substring(3) // split `?q=`
console.log('repoList', repoList)
  let page = 1
  async function fetchData() {
    setError(null)
    setLoading(true)
    try {
      if( !search || search === "") {
        setTotalCount(null)
        setRepoList([])
      } else {
      const url = 'https://api.github.com/search/repositories'
      const query = `?q=${search}?page=${page}`
      const resp = await fetch(`${url}${query}`)
      const data = await resp.json()
      console.log('data?',data)
      if(!data.items) {
        if(data.message) {
          setError(`${data.message}`)
        } else {
          setError('unknown error occurred') 
        }
        setLoading(false)
        return
      }
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
      debounce(() => fetchData({keyword: search}), 1000)()
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  },[])

  React.useEffect(() => {
    setRepoList([]) 
    fetchData()
  },[search])

  return (
    <div className="App">
      <h1>Search Repository in Github</h1>
      <SearchBar onSetKeyword={debounceSetKeyword} paramsSearch={search}/>
      {error && 
      <ErrorBox>
        <p>Some error has occurred.</p>
        <div className='msg'>{error}</div>  
      </ErrorBox>}
      {totalCount === 0 && <p>No matches were found.</p>}
      {!!totalCount && <p>{totalCount} results were found.</p>}

      <RepoList repoList={repoList}/>
      {loading && <img src={loadingGif} width={50}/>}
    </div>
  );
}

const ErrorBox = styled.div`
  padding: 10px;
  background-color: #ffa4a4;
  color: #9d3939;
  width: 50%;
  margin: 20px auto;

  & > .msg {
    background-color: #eee;
    padding: 15px;
    margin-top: 20px;
    line-height: 25px;
  }
`
export default App;
