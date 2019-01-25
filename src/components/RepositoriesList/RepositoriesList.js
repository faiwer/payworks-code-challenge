import React, { memo } from 'react';
import { connect } from 'react-redux';

import Paginator, { paginationMapQuery } from './Paginator';
import routerListenerHoC from '../tools/routerListenerHoC';
import { getRepositoriesPage } from '~/redux/filters';
import RepositoryListItem from './RepositoryListItem';

const RepositoriesList = ({ repositories }) =>
{
	return <div className="cch-reps-box">
		<Paginator/>
		<div className="cch-orgs-list">
			<For each="repository" of={repositories}>
				<RepositoryListItem
					{...{ repository }}
					key={repository.id}
				/>
			</For>
		</div>
		<Paginator/>
	</div>;
};

const redux = connect(
	(st, { page }) => (
	{
		repositories: getRepositoriesPage(st, page),
	}),
);

export default RepositoriesList
	|> memo
	|> redux
	|> routerListenerHoC(paginationMapQuery);