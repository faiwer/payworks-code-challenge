import { createSelector } from 'reselect';

import { getRepositoriesList } from '~/api';

export const initialState =
{
	filters:
	{
		organizationName: null,
		lang: null,
	},
	sort:
	{
		field: null,
		dir: 'DESC',
	},
	activeOrganization: null,
	error: null,
	isLoading: false,
	repositories: null,
};

export const aSetFilter = (field, value) => (
	{
		type: 'SET_FILTER',
		field,
		value
	});
const aSetError = err => (
	{
		type: 'ERROR',
		error: err.message || err,
	});
const aClearError = err => (
	{
		type: 'CLEAR_ERROR',
	});
const aSetLoading = isLoading => (
	{
		type: 'SET_LOADING',
		isLoading,
	});
const aSetRepositoriesList = (activeOrganization, repositories) => (
	{
		type: 'SET_REP_LIST',
		activeOrganization,
		repositories,
	});

export const aSearchRepositories = () =>
	async (dispatch, getState) =>
	{
		try
		{
			aClearError() |> dispatch;
			aSetRepositoriesList(null) |> dispatch;
			aSetLoading(true) |> dispatch;

			const { organizationName } = getState().filters;
			const repositories = await getRepositoriesList(organizationName);
			aSetRepositoriesList(organizationName, repositories) |> dispatch;
		}
		catch(err)
		{
			aSetError(err) |> dispatch;
		}
		finally
		{
			aSetLoading(false) |> dispatch;
		}
	};

export const map =
{
	ERROR: (st, { error }) => (
		{
			...st,
			error,
		}),
	CLEAR_ERROR: st => (
		{
			...st,
			error: null,
		}),
	SET_LOADING: (st, { isLoading }) => (
		{
			...st,
			isLoading,
		}),
	SET_FILTER: (st, { field, value }) => (
		{
			...st,
			filters:
			{
				...st.filters,
				[field]: value,
			}
		}),
	SET_REP_LIST: (st, { activeOrganization, repositories }) => (
		{
			...st,
			activeOrganization,
			repositories,
		}),
};

const PAGE_LIMIT = 1;

export const getPaginationInfo = createSelector(
	st => st.repositories.length,
	count =>
	{
		return (
			{
				itemsCount: count,
				pagesCount: Math.ceil(count / PAGE_LIMIT),
				pageLimit: PAGE_LIMIT,
			});
	}
);

export const getRepositoriesPage = createSelector(
	st => st.repositories,
	(_, page) => page,
	(list, page) =>
	{
		const offset = (page - 1) * PAGE_LIMIT;
		return list.slice(offset, offset + PAGE_LIMIT);
	}
);