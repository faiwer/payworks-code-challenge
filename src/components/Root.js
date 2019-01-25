import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Layout from './Layout';
import OrganizationsList from './OrganizationsList';
import Organization from './Organization';

const defPath = [{ url: '/', label: 'Root' }];

export default () =>
{
	return <HashRouter>
		<Layout path={defPath}>
			<Route exact path="/" component={OrganizationsList}/>
			<Route path="/org/:id" component={Organization}/>
		</Layout>
	</HashRouter>;
};