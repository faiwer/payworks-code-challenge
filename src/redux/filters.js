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
const aSetRepositoriesList = repositories => (
	{
		type: 'SET_REP_LIST',
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
			aSetRepositoriesList(repositories) |> dispatch;
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
	SET_REP_LIST: (st, { repositories }) => (
		{
			...st,
			repositories,
		}),
};