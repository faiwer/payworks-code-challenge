import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { useAutoCallback as useCallback } from 'hooks.macro';
import { withRouter } from 'react-router-dom';

import { aSetFilter } from '~/redux/filters/actions';
import { aClearOrganization } from '~/redux/organization/actions';

const SearchFilter = (
{
	value, history, clearOrganization,
	setSearch
}) =>
{
	const onChange = useCallback(evt =>
		{
			setSearch(evt.target.value);
		});

	const onSearch = useCallback(() =>
		{
			if(value.includes('/'))
				throw new Error(`Isn't implemented yet`);
			else
			{
				clearOrganization();
				history.push(`/org/${value}`);
			}
		});

	return <Input.Search
		className="cch-filter-search"
		placeholder="Organization name"
		enterButton
		{...{ value, onChange, onSearch }}
	/>;
};

const redux = connect(
	st => ({ value: st.filters.search || '' }),
	dispatch => (
	{
		setSearch: value => aSetFilter('search', value) |> dispatch,
		clearOrganization: () => aClearOrganization() |> dispatch,
	}),
);

export default SearchFilter |> memo |> redux |> withRouter;