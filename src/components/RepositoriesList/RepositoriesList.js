import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'antd';

import Paginator, { paginationMapQuery } from '~/components/UI/Paginator';
import routerListenerHoC from '../tools/routerListenerHoC';
import { getPaginationInfo } from '~/redux/organization/selectors';
import RepositoryListItem from './RepositoryListItem';

const RepositoriesList = ({ pagInfo }) =>
{
	const repositories = pagInfo.items;

	return <div className="cch-list-box">
		<Paginator {...pagInfo}/>
		<div className="cch-list-list">
			<If condition={!repositories.length}>
				<Alert
					message="Empty list"
					type="info"
				/>
			</If>
			<For each="repository" of={repositories}>
				<RepositoryListItem
					{...{ repository }}
					key={repository.id}
				/>
			</For>
		</div>
		<Paginator {...pagInfo}/>
	</div>;
};

const redux = connect(
	({ organization: org }, { page }) => (
	{
		pagInfo: getPaginationInfo(org, page),
	}),
);

export default RepositoriesList
	|> memo
	|> redux
	// fetch page from url for redux()
	|> routerListenerHoC(paginationMapQuery);