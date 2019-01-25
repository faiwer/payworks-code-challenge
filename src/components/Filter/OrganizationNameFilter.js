import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { useAutoCallback as useCallback } from 'hooks.macro';

import { aSetFilter, aSearchRepositories } from '~/redux/filters';

const OrganizationNameFilter = ({ value, search, setOrgName }) =>
{
	const onChange = useCallback(evt => { setOrgName(evt.target.value); });

	return <Input.Search
		className="cch-filter-search"
		placeholder="Enter an organization name"
		enterButton
		onSearch={search}
		{...{ value, onChange }}
	/>;
};

const redux = connect(
	st => ({ value: st.filters.organizationName }),
	dispatch => (
	{
		setOrgName: value => aSetFilter('organizationName', value) |> dispatch,
		search: () => aSearchRepositories() |> dispatch,
	})
);

export default OrganizationNameFilter |> memo |> redux;