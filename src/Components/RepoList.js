import styled from 'styled-components'
import {RepoForked} from '@styled-icons/octicons/RepoForked'
import {Star} from '@styled-icons/bootstrap/Star'

function RepoList(props) {
	console.log('props-repo', props.repoList)
	return(
		<Wrapper>
			{props.repoList.map((repo,idx) =>
				<a className="repo-item" target="_blank" href={repo.html_url}>
					<img src={repo.owner.avatar_url} width={100} height={100}/>
					<div style={{marginLeft: 20 , textAlign:'start'}}>
						<p style={{fontWeight: 'bold', fontSize:18}}>{repo.full_name}</p>
						<p style={{color: '#4c4c4c', fontSize: 12}}>{new Date(repo.created_at).toLocaleDateString('en-ZA')} created</p>
						<p style={{color: '#4c4c4c', fontSize: 14, marginTop: 5}}>{repo.description}</p>
						<div className="row" style={{marginTop: 10}}>
							<span>
								<Star width={16}/>
								<p>{repo.stargazers_count}</p>
							</span>
							<span style={{marginLeft: 10}}>
								<RepoForked width={16}/>
								<p>{repo.forks_count}</p>
							</span>
						</div>
					</div>
				</a>
			)}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

	& .repo-item {
		display: flex;
		margin-top: 15px;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 20px;
		width: 70%;
		cursor: pointer;
		text-decoration: none;
		color: #0f0909;
		overflow: auto;
	}

	& span {
		display: flex;
		& > p {
			margin-left: 8px;
		}
	}
`

export default RepoList;