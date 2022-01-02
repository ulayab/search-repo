import React from 'react';
import styled from 'styled-components';

function SearchBar (props) {
	const [searchText, setSearchText] = React.useState('')

	return(
		<Wrapper>
			<input
				placeholder="Search for repositories"
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
	& > input{
		text-align: center;
		width: 60%;
		border: 2px solid #fff;
		border-radius: 40px;
		font-size: 20px;
		letter-spacing: 1px;
		padding: 10px 20px;
		margin-bottom: 10px;
	}
`

export default SearchBar;