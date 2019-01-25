import _ from 'lodash';
import React, { memo } from 'react';
import { Pagination } from 'antd';
import qs from 'query-string';
import { useAutoCallback as useCallback } from 'hooks.macro';
import { connect } from 'react-redux';

import routerListenerHoC from '../tools/routerListenerHoC';
import { getPaginationInfo } from '~/redux/filters';

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

const redux = connect(
	st => getPaginationInfo(st)
);

export default RepPagination
	|> memo
	|> redux
	|> routerListenerHoC(paginationMapQuery);