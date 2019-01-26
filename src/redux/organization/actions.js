import { getRepositoriesList } from '~/api';

export const SET_ERROR = 'ORG_SET_ERROR';
export const CLEAR_ERROR = 'ORG_CLEAR_ERROR';
export const SET_LOADING = 'ORG_SET_LOADING';
export const CLEAR_ORG = 'ORG_CLEAR';
export const SET_ORG = 'ORG_SET';
export const SET_REP_LIST = 'ORG_SET_REP_LIST';

const aSetError = err => (
	{
		type: SET_ERROR,
		error: err.message || err,
	});
const aClearError = err => (
	{
		type: CLEAR_ERROR,
	});
const aSetLoading = isLoading => (
	{
		type: SET_LOADING,
		isLoading,
	});
export const aClearOrganization = () => (
	{
		type: CLEAR_ORG,
	});
const aSetOrganization = organizationName => (
	{
		type: SET_ORG,
		organizationName,
	});
const aSetRepositoriesList = repositories => (
	{
		type: SET_REP_LIST,
		repositories,
	});

export const aSearchRepositories = organizationName =>
	async (dispatch, getState) =>
	{
		try
		{
			// clear error, rep-list and set active org-name
			aSetOrganization(organizationName) |> dispatch;
			aSetLoading(true) |> dispatch;

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