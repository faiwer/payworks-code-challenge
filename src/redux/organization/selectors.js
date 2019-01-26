import { createSelector } from 'reselect';

const PAGE_LIMIT = DEV ? 3 : 10;

export const getPaginationInfo = createSelector(
	st => st.repositories,
	(_, page) => page,
	(list, page) =>
	{
		const count = list.length;
		const offset = (page - 1) * PAGE_LIMIT;

		return (
			{
				items: list.slice(offset, offset + PAGE_LIMIT),
				itemsCount: count,
				pagesCount: Math.ceil(count / PAGE_LIMIT),
				pageLimit: PAGE_LIMIT,
			});
	}
);