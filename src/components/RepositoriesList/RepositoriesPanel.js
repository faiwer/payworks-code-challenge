import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Spin, Alert } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';

import ErrBoundary from '../Layout/ErrBoundary';
import RepositoriesList from './RepositoriesList';

const RepositoriesPanel = (
{
	isLoading, repositories, error, match,
	activeOrganization
}) =>
{
	const urlOrg = match.params.organizationName;
	if(activeOrganization && activeOrganization !== urlOrg)
		return <Redirect to={`/org/${activeOrganization}`}/>;

	if(isLoading)
		return <Spin size="large"/>;

	if(error)
		return <Alert
			message={error}
			type="error"
		/>;

	if(repositories === null)
		return null;

	if(repositories.length === 0)
		return <Alert
			message="There's no repository yet"
			type="info"
		/>;

	return <RepositoriesList {...{ repositories }}/>;
};

const redux = connect(
	st => (
	{
		activeOrganization: st.activeOrganization,
		repositories: st.repositories,
		isLoading: st.isLoading,
		error: st.error,
	}),
);

export default RepositoriesPanel
	|> memo
	|> redux
	|> ErrBoundary
	|> withRouter;