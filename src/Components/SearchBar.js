function SearchBar (props) {
	return(
		<div className="search-bar">
			<input
				onChange={e => props.onChangeText(e.target.value)}
				value={props.value}
				/>
		</div>
	)
}

export default SearchBar;