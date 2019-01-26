import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Layout from './Layout';
import RepositoriesPanel from './RepositoriesList/RepositoriesPanel';
import RepositoryPanel from './Repository/RepositoryPanel';

export default () =>
{
	return <HashRouter>
		<Layout>
			<Route
				exact
				path="/"
				component={RepositoriesPanel}
			/>
			<Route
				exact
				path="/org/:organizationName"
				component={RepositoriesPanel}
			/>
			<Route
				path="/rep/:organizationName/:repositoryName"
				component={RepositoryPanel}
			/>
		</Layout>
	</HashRouter>;
};