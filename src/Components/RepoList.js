import styled from 'styled-components'
import {RepoForked} from '@styled-icons/octicons/RepoForked'
import {Star} from '@styled-icons/bootstrap/Star'

function RepoList(props) {
	return(
		<Wrapper>
			{props.repoList.map((repo,idx) =>
				<a className="repo-item" target="_blank" href={repo.html_url}>
					<img src={repo.owner.avatar_url} width={100} height={100}/>
					<div className="repo-content">
						<p className="name">{repo.full_name}</p>
						<p className="date">{new Date(repo.created_at).toLocaleDateString('en-ZA')} created</p>
						<p className="description">{repo.description}</p>
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
		margin: 15px 0px;
		border-radius: 5px;
		padding: 20px;
		width: 70%;
		cursor: pointer;
		text-decoration: none;
		color: #0f0909;
		background-color: #fff;
		overflow: auto;
		transition: 300ms;
	  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03), 0 6px 6px rgba(0, 0, 0, 0.03);

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08), 0 6px 6px rgba(0, 0, 0, 0.08);
  }

	& > .repo-content {
		margin-left: 20px;
		text-align: start;
		& > .name {
			font-weight: bold;
			font-size: 18px;
		}
	
		& > .date {
			color: #4c4c4c;
			font-size: 12px;
		}
	
		& > .description {
			color: #4c4c4c;
			font-size: 14px;
			margin-top: 5px;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	}
	}

	& span {
		display: flex;
		& > p {
			margin-left: 8px;
		}
	}
`

export default RepoList;