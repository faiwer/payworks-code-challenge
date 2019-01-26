export const SET_ERROR = 'REP_SET_ERROR';
export const CLEAR_ERROR = 'REP_CLEAR_ERROR';
export const SET_LOADING = 'REP_SET_LOADING';
export const CLEAR_REP = 'REP_CLEAR';
export const SET_REP = 'REP_SET';
export const SET_BRANCHES_LIST = 'REP_SET_BRANCHES_LIST';

import { getBranchesList } from '~/api';

const aSetError = err => (
	{
		type: SET_ERROR,
		error: err.message || err,
	});
export const aClearError = () => (
	{
		type: CLEAR_ERROR,
	});
const aSetLoading = isLoading => (
	{
		type: SET_LOADING,
		isLoading,
	});
export const aClearRepository = () => (
	{
		type: CLEAR_REP,
	});
const aSetRepository = (organizationName, repositoryName) => (
	{
		type: SET_REP,
		organizationName,
		repositoryName,
	});
const aSetBranchesList = branches => (
	{
		type: SET_BRANCHES_LIST,
		branches,
	});

export const aSearchBranches = (organizationName, repositoryName) =>
	async (dispatch, getState) =>
	{
		try
		{
			// clear error, branches-list and set active branch
			aSetRepository(organizationName, repositoryName) |> dispatch;
			aSetLoading(true) |> dispatch;

			const branches = await getBranchesList(
				organizationName, repositoryName);
			aSetBranchesList(branches) |> dispatch;
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