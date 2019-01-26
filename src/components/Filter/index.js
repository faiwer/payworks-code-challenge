import React from 'react';
import { Route } from 'react-router-dom';

import Search from './Search';
import Language from './Language';
import Sort from './Sort';

const OrganizationFilters = () =>
	<>
		<Search/>
		<Language/>
		<Sort/>
	</>;
const RepositoryFilters = () => <Search/>;

export default () =>
	<div className="cch-filter">
		<Route
			exact
			path="/"
			component={OrganizationFilters}
		/>
		<Route
			exact
			path="/org/:organizationName"
			component={OrganizationFilters}
		/>
		<Route
			exact
			path="/rep/:organizationName/:repositoryName"
			component={RepositoryFilters}
		/>
	</div>;