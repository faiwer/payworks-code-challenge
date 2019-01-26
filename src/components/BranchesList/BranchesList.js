import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'antd';

import Paginator, { paginationMapQuery } from '~/components/UI/Paginator';
import routerListenerHoC from '../tools/routerListenerHoC';
import { getPaginationInfo } from '~/redux/repository/selectors';
import BranchListItem from './BranchListItem';

const BranchesList = ({ pagInfo }) =>
{
	const branches = pagInfo.items;

	return <div className="cch-list-box">
		<Paginator {...pagInfo}/>
		<div className="cch-list-list">
			<If condition={!branches.length}>
				<Alert
					message="Empty list"
					type="info"
				/>
			</If>
			<For each="branch" of={branches}>
				<BranchListItem
					{...{ branch }}
					key={branch.name}
				/>
			</For>
		</div>
		<Paginator {...pagInfo}/>
	</div>;
};

const redux = connect(
	({ repository: rep }, { page }) => (
	{
		pagInfo: getPaginationInfo(rep, page),
	}),
);

export default BranchesList
	|> memo
	|> redux
	// fetch page from url for redux()
	|> routerListenerHoC(paginationMapQuery);