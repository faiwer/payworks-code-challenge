import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { useAutoCallback as useCallback } from 'hooks.macro';

import { aClearOrganization } from '~/redux/organization/actions';
import { aClearRepository } from '~/redux/repository/actions';
import routerListenerHoC from '~/components/tools/routerListenerHoC';

const SearchFilter = (
{
	value, history,
	clearOrganization, clearRepository,
	organizationName, repositoryName,
}) =>
{
	const onSearch = useCallback(value =>
		{
			if(value.includes('/'))
			{
				const [org, rep] = value.split('/');
				clearRepository();
				if(org !== organizationName || rep !== repositoryName)
					history.push(`/rep/${org}/${rep}`);
			}
			else
			{
				clearOrganization();
				if(organizationName !== value)
					history.push(`/org/${value}`);
			}
		});

	return <Input.Search
		className="cch-filter-search"
		placeholder="Organization name"
		enterButton
		{...{ onSearch }}
	/>;
};

const mapQuery = ({ match }) =>
{
	const { organizationName, repositoryName } = match.params;
	return { organizationName, repositoryName };
};

const redux = connect(
	null,
	{
		clearOrganization: aClearOrganization,
		clearRepository: aClearRepository,
	},
);

export default SearchFilter
	|> memo
	|> redux
	|> routerListenerHoC(mapQuery);