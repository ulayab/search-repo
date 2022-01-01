function RepoList(props) {
	console.log('props-repo', props.repoList)
	return(
		<div className="repo-list">
			{props.repoList.map((repo,idx) =>
				<a className="repo-item" target="_blank" href={repo.html_url}>
					<img src={repo.owner.avatar_url} width={100} height={100}/>
					<div style={{marginLeft: 20 , textAlign:'start'}}>
						<p style={{fontWeight: 'bold', fontSize:18}}>{repo.full_name}</p>
						<p style={{color: '#4c4c4c', fontSize: 12}}>{new Date(repo.created_at).toLocaleDateString('en-ZA')} created</p>
						<p style={{color: '#4c4c4c', fontSize: 14, marginTop: 5}}>{repo.description}</p>
						<div className="row">
							<p>star{repo.stargazers_count}</p>
							<p>forks{repo.forks_count}</p>
						</div>
					</div>
				</a>
			)}
		</div>
	)
}

export default RepoList;