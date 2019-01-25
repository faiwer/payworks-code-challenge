import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Spin, Alert } from 'antd';

import ErrBoundary from '../Layout/ErrBoundary';

const RepositoryListItem = ({ repository }) =>
	<div>{repository.id}</div>;

const RepositoriesList = ({ isLoading, repositories, error }) =>
	<div className="cch-orgs-list">
		<If condition={isLoading}>
			<Spin size="large"/>
		</If>
		<If condition={error}>
			<Alert
				message={error}
				type="error"
			/>
		</If>
		<If condition={repositories !== null}>
			<If condition={repositories.length === 0}>
				<Alert
					message="There's no repository yet"
					type="info"
				/>
			</If>
			<If condition={repositories.length > 0}>
				<For each="repository" of={repositories}>
					<RepositoryListItem
						{...{ repository }}
						key={repository.id}
					/>
				</For>
			</If>
		</If>
	</div>;

const redux = connect(
	st => (
	{
		repositories: st.repositories,
		isLoading: st.isLoading,
		error: st.error,
	}),
);

export default RepositoriesList |> memo |> redux |> ErrBoundary;