import React, { memo } from 'react';
import { Pagination } from 'antd';
import qs from 'query-string';
import { useAutoCallback as useCallback } from 'hooks.macro';

import routerListenerHoC from '../tools/routerListenerHoC';

const RepPagination = ({ page, itemsCount, pageLimit, history }) =>
{
	const onChange = useCallback(newPage =>
		{
			if(page === newPage)
				return;

			history.push(
				{
					search: newPage > 1
						? `?page=${newPage}`
						: ''
				});
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