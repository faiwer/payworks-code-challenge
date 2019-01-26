import React, { memo } from 'react';
import { Pagination } from 'antd';
import qs from 'query-string';
import { useAutoCallback as useCallback } from 'hooks.macro';

import { genQueryString } from '~/tools';
import routerListenerHoC from '../tools/routerListenerHoC';

const RepPagination = ({ page, itemsCount, pageLimit, history, location }) =>
{
	const onChange = useCallback(newPage =>
		{
			if(page === newPage)
				return;

			const params =
				{
					...qs.parse(location.search),
					page: newPage > 1 ? newPage : null,
				};
			history.push(genQueryString(params));
		});

	if(itemsCount < pageLimit)
		return null;

	return <Pagination
		className="cch-reps-pagination"
		total={itemsCount}
		pageSize={pageLimit}
		current={page}
		onChange={onChange}
	/>;
};

export const paginationMapQuery = ({ location }) =>
{
	const query = qs.parse(location.search);
	const page = Number(query.page || 1);
	return { page };
};

export default RepPagination
	|> memo
	|> routerListenerHoC(paginationMapQuery);