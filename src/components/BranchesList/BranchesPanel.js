import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Alert } from 'antd';

import ErrBoundary from '../Layout/ErrBoundary';
import routerListenerHoC from '../tools/routerListenerHoC';
import BranchesList from './BranchesList';
import { aSearchBranches } from '~/redux/repository/actions';

const RepositoryHeader = ({ storeOrganization, storeRepository }) =>
	<h2 className="cch-content-title">
		Repository: {storeOrganization}/{storeRepository}
	</h2>;

const RepositoryPanel = (
{
	queryOrganization, queryRepository, queryPath,
	storeOrganization, storeRepository, storePath,
	isLoading, error, branchesLoaded,
	search,
}) =>
{
	useEffect(() =>
	{
		// query and store are consistent, just use it
		if(queryPath === storePath)
		{
			if(!branchesLoaded && !isLoading && !error)
				// something has got wrong, reload?
				search(queryOrganization, queryRepository);
		}
		else
			// query and store mismatch, so let's load the query version
			search(queryOrganization, queryRepository);
	});

	if(queryPath !== storePath)
		return null; // loading process will be started soon

	if(isLoading) // show spinner
		return <Spin size="large"/>;

	if(error) // probably ajax-error
		return <Alert
			message={error}
			type="error"
		/>;

	if(!branchesLoaded)
		// something has got wrong
		return null;

	return <>
		<RepositoryHeader {...{ storeOrganization, storeRepository }}/>
		<BranchesList/>
	</>;
};

const redux = connect(
	({ repository: rep }) => (
	{
		storeOrganization: rep.organizationName || null,
		storeRepository: rep.repositoryName || null,
		storePath: rep.organizationName
			? `${rep.organizationName}/${rep.repositoryName}`
			: null,
		branchesLoaded: !!rep.branches,
		isLoading: rep.isLoading,
		error: rep.error,
	}),
	{
		search: aSearchBranches,
	},
);

const mapQuery = ({ match: { params } }) =>
{
	const { organizationName, repositoryName } = params;
	return (
	{
		queryOrganization: organizationName,
		queryRepository: repositoryName,
		queryPath: `${organizationName}/${repositoryName}`,
	});
};

export default RepositoryPanel
	|> memo
	|> redux
	|> routerListenerHoC(mapQuery)
	|> ErrBoundary;