import React from 'react';

function SearchBar (props) {
	const [searchText, setSearchText] = React.useState('')

	return(
		<div className="search-bar">
			<input
				onChange={e => {
					props.onSetKeyword(e.target.value)
					setSearchText(e.target.value)
				}}
				value={searchText}
				/>
				 {searchText == '' && <p>Please insert the repo name</p>}
		</div>
	)
}

export default SearchBar;