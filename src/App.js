import React from 'react';
import debounce from 'lodash.debounce'
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import loadingGif from './loading.gif';
import './App.css';
import SearchBar from './Components/SearchBar';
import RepoList from './Components/RepoList';

function App() {
  const [repoList, setRepoList] = React.useState([])
  const [totalCount, setTotalCount] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  
  const pageRef = React.useRef(1);
  const history = useHistory();
  let search = typeof window !== 'undefined' ? window.location.search.substring(3) : ''; // split `?q=` 

  async function fetchData() {
    let search = typeof window !== 'undefined' ? window.location.search.substring(3) : ''; // split `?q=` 
    setError(null)
    try {
      if (pageRef.current < 0) {
        pageRef.current = 1
        return
      }
      setLoading(true)

      if (!search || search === "") {
        setTotalCount(null)
        setRepoList([])
      } else {
        const url = 'https://api.github.com/search/repositories'
        const query = `?q=${search}?page=${pageRef.current}`
        const resp = await fetch(`${url}${query}`)
        const data = await resp.json()

        if (!data.items) {
          if (data.message) {
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

        setRepoList(prevRepoList => {
          let resultArr = [...prevRepoList, ...new_items]
          if (resultArr.length < data.total_count) {
            pageRef.current = pageRef.current+ 1
          } else {
            pageRef.current = -1
          }
          
          return resultArr
        })
      }
    } catch (ex) {
      console.warn(ex)
    }
    setLoading(false)
  }

  const debounceSetKeyword = debounce((keyword) => {
    history.push(`?q=${keyword}`);
  }, 1000)

  const debounceGet = debounce(() => {
    let _search =
      typeof window !== 'undefined' ? window.location.search.substring(3) : ''; // split `?q=` 
    fetchData(_search)
  }, 1000)

  function handleScroll(e) {
    let topOfScroll = e.target.documentElement.scrollTop
    let totalHeight = e.target.documentElement.scrollHeight
    if (topOfScroll + window.innerHeight == totalHeight && !error) {
      debounceGet()
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    search !== '' && setRepoList([])
    fetchData()
  }, [search])

  return (
    <Wrapper>
      <div className='container'>
        <div className="row">
          <h1>Search Repository in</h1>
          <span>
            <img width={120} src={require('./GitHub_Logo.png')} />
          </span>
        </div>
        <SearchBar onSetKeyword={debounceSetKeyword} paramsSearch={search} />
        {error &&
          <ErrorBox>
            <p>Some error has occurred.</p>
            <div className='msg'>{error}</div>
          </ErrorBox>}
        {totalCount === 0 && <p>No matches were found.</p>}
        {!!totalCount && <p>{totalCount} results were found.</p>}

        <RepoList repoList={repoList} />
        {loading && <img src={loadingGif} width={50} style={{ marginBottom: 30 }} />}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  & > .container {
    text-align: center;
    padding-bottom: 150px;
  
    & > .row {

      display: flex;
      justify-content: center;
      align-items: center;
      
      & > h1 {
        color: #565657;
      }
    }
  }
`

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
