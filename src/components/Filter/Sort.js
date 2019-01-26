import React, { memo } from 'react';
import { Select } from 'antd';
import qs from 'query-string';
import { useAutoCallback as useCallback } from 'hooks.macro';

import routerListenerHoC from '~/components/tools/routerListenerHoC';
import { genQueryString } from '~/tools';

export const defaultSort = 'stars';
const sorts =
	[
		{ key: null, label: 'Sort by stars' },
		{ key: 'forks', label: 'Sort by forks' },
	];

const SortFilter = ({ history, location, sort }) =>
{
	const onChange = useCallback(newSort =>
		{
			if(sort === newSort)
				return;

			const params =
				{
					...qs.parse(location.search),
					page: null, // explicitly reset page
					sort: newSort,
				};
			history.push(genQueryString(params));
		});

	return <Select
		value={sort}
		{...{ onChange }}
		className="cch-filter-sort"
	>
		<For each="sort" of={sorts}>
			<Select.Option
				key={sort.key}
				value={sort.key}
			>
				{sort.label}
			</Select.Option>
		</For>
	</Select>;
};

const mapQuery = ({ location }) =>
{
	return { sort: qs.parse(location.search).sort || null };
};

export default SortFilter
	|> memo
	|> routerListenerHoC(mapQuery);