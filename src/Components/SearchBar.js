import React from 'react';
import styled from 'styled-components';
import {Search} from '@styled-icons/boxicons-regular/Search'

function SearchBar (props) {
	const [searchText, setSearchText] = React.useState(props.paramsSearch)

	return(
		<Wrapper>
			<Search size={22} style={{marginLeft: 10}}/>
			<input
				placeholder="search repos"
				onChange={e => {
					props.onSetKeyword(e.target.value)
					setSearchText(e.target.value)
				}}
				value={searchText}
				/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 250px;
	margin: 0 auto;
	margin-top: 20px;
	margin-bottom: 20px;
	background-color: #fff;
	border: 4px solid #000;
	text-align: start;
	& > input{
		border: none;
		font-size: 16px;
		letter-spacing: 1px;
		padding: 10px;
	}
	textarea:focus, input:focus{
		outline: none;
	}
`

export default SearchBar;