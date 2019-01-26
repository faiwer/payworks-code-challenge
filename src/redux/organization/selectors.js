import _ from 'lodash';
import { createSelector } from 'reselect';

const PAGE_LIMIT = DEV ? 1 : 10;

const getSortedFilteresReps = createSelector(
	st => st.repositories,
	(_, query) => query.lang,
	(list, lang) =>
	{
		if(lang)
			list = list.filter(v => v.language === lang);

		// todo: sort

		return list;
	}
);

export const getPaginationInfo = createSelector(
	getSortedFilteresReps,
	(_, { page }) => page,
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

export const getUsedLanguages = createSelector(
	st => st.repositories,
	list => _.uniqBy(list, 'language').map(v => v.language)
);