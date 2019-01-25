import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Spin, Alert } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';

import ErrBoundary from '../Layout/ErrBoundary';

const RepositoryListItem = ({ repository }) =>
	<div>{repository.id}</div>;

const RepositoriesList = (
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

	return <div className="cch-orgs-list">
		<For each="repository" of={repositories}>
			<RepositoryListItem
				{...{ repository }}
				key={repository.id}
			/>
		</For>
	</div>;
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

export default RepositoriesList |> memo |> redux |> ErrBoundary |> withRouter;