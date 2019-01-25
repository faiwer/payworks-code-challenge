import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Layout from './Layout';
import RepositoriesPanel from './RepositoriesList/RepositoriesPanel';
import Repository from './Repository';

const defPath = [{ url: '/', label: 'Root' }];

export default () =>
{
	return <HashRouter>
		<Layout path={defPath}>
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
				path="/rep/:organizationName/:repositoryId"
				component={Repository}
			/>
		</Layout>
	</HashRouter>;
};