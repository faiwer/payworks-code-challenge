import _ from 'lodash';
import { createSelector } from 'reselect';

// defaultSort may be defined here... or there.
// I don't know where is better :)
import { defaultSort } from '~/components/Filter/Sort';

const sortFields =
	{
		stars: { field: 'stargazers_count', dir: 'DESC' },
		forks: { field: 'forks_count', dir: 'DESC' },
	};

const PAGE_LIMIT = (DEV || window.TEST) ? 3 : 10;

const getSortedFilteresReps = createSelector(
	st => st.repositories,
	(_, query) => query.lang,
	(_, query) => query.sort || defaultSort,
	(list, lang, sort) =>
	{
		if(lang)
			list = list.filter(v => v.language === lang);

		const { field, dir } = sortFields[sort];
		return list.sort((a, b) =>
			{
				const v1 = a[field];
				const v2 = b[field];
				const result = v1 > v2 ? +1 : -1;
				return dir === 'DESC'
					? result * -1
					: result;
			});
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