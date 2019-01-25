import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Layout from './Layout';
import RepositoriesList from './RepositoriesList';
import Repository from './Repository';

const defPath = [{ url: '/', label: 'Root' }];

export default () =>
{
	return <HashRouter>
		<Layout path={defPath}>
			<Route
				exact
				path="/"
				component={RepositoriesList}
			/>
			<Route
				exact
				path="/org/:organizationName"
				component={RepositoriesList}
			/>
			<Route
				path="/rep/:organizationName/:repositoryId"
				component={Repository}
			/>
		</Layout>
	</HashRouter>;
};