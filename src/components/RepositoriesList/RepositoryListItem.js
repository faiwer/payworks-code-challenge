import React, { memo } from 'react';
import { Card, Avatar, Icon } from 'antd';

import { displayDate } from '~/tools';

const StarGazers = ({ count }) =>
	<If condition={count > 0}>
		<div className="cch-stargazers">
			<Icon
				type="star"
				theme="filled"
			/>
			<span>
				{count}
			</span>
		</div>
	</If>;

const RepositoryTitle = ({ repository }) =>
	<>
		<Avatar
			shape="square"
			src={repository.owner.avatar_url}
		/>
		<h3 className="cch-rep-li-name">
			{repository.name}
		</h3>
		<StarGazers count={repository.stargazers_count}/>
	</>;

const LanguageAttr = ({ language, url }) =>
	<If condition={language}>
		<li>
			<dt>Language</dt>
			<dd>
				<a href={url}>
					{language}
				</a>
			</dd>
		</li>
	</If>;

const GitURLAttr = ({ url }) =>
	<li>
		<dt>Git</dt>
		<dd>
			<a
				href={url}
				target="_blank"
			>
				URL
			</a>
		</dd>
	</li>;

const UpdatedAttr = ({ date }) =>
	<li>
		<dt>Updated on</dt>
		<dd>
			{displayDate(date)}
		</dd>
	</li>;

const DescriptionAttr = ({ description }) =>
	<div className="cch-rep-li-description">
		{description}
	</div>;

const RepositoryListItem = ({ repository }) =>
	<Card
		title={<RepositoryTitle {...{ repository }}/>}
		className="cch-repository-listitem"
	>
		<DescriptionAttr description={repository.description}/>
		<ul className="cch-rep-li-details">
			<LanguageAttr
				language={repository.language}
				url={repository.languages_url}
			/>
			<GitURLAttr url={repository.git_url}/>
			<UpdatedAttr date={repository.updated_at}/>
		</ul>
	</Card>;

export default RepositoryListItem |> memo;