import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Alert } from 'antd';

import ErrBoundary from '../Layout/ErrBoundary';
import RepositoriesList from './RepositoriesList';
import {
	aSearchRepositories,
	aClearOrganization } from '~/redux/organization/actions';
import routerListenerHoC from '../tools/routerListenerHoC';

const RepositoriesPanel = (
{
	isLoading, repositoriesLoaded, error,
	storeOrganization, queryOrganization,
	search, reset
}) =>
{
	useEffect(() =>
	{
		if(!queryOrganization && storeOrganization)
			// there's no organization in the query, but some organization
			// is presented in the store
			reset();
		else if(!queryOrganization)
			// both store and query are empty
			// nothing to do here
			return;
		// query and store are consistent, just use it
		else if(queryOrganization === storeOrganization)
		{
			if(!repositoriesLoaded && !isLoading && !error)
				// something has got wrong, reload?
				search(queryOrganization);
		}
		else
			// query and store mismatch, so let's load the query version
			search(queryOrganization);
	});

	if(queryOrganization !== storeOrganization)
		return null; // loading process will be started soon

	if(!storeOrganization) // user should set one
		return `Organization isn't set`;

	if(isLoading) // show spinner
		return <Spin size="large"/>;

	if(error) // probably ajax-error
		return <Alert
			message={error}
			type="error"
		/>;

	if(!repositoriesLoaded)
		// something has got wrong
		return null;

	return <>
		<h2 className="cch-content-title">
			Organization: {storeOrganization}
		</h2>
		<RepositoriesList/>
	</>;
};

const redux = connect(
	({ organization: org }) => (
	{
		storeOrganization: org.organizationName || null,
		repositoriesLoaded: !!org.repositories,
		isLoading: org.isLoading,
		error: org.error,
	}),
	{
		search: aSearchRepositories,
		reset: aClearOrganization,
	},
);

const mapQuery = ({ match: { params } }) =>
{
	const { organizationName } = params;
	return { queryOrganization: organizationName || null };
};

export default RepositoriesPanel
	|> memo
	|> redux
	|> ErrBoundary
	|> routerListenerHoC(mapQuery);