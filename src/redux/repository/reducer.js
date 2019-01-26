import {
	SET_ERROR,
	CLEAR_ERROR,
	SET_LOADING,
	CLEAR_REP,
	SET_REP,
	SET_BRANCHES_LIST } from './actions';

const initialState =
{
	organizationName: null,
	repositoryName: null,
	error: null,
	isLoading: false,
	branches: null,
};

export const map =
{
	[SET_ERROR]: (st, { error }) => (
		{
			...st,
			error,
		}),
	[CLEAR_ERROR]: st => (
		{
			...st,
			error: null,
		}),
	[SET_LOADING]: (st, { isLoading }) => (
		{
			...st,
			isLoading,
		}),
	[CLEAR_REP]: st => (
		{
			...st,
			error: null,
			branches: null,
			organizationName: null,
			repositoryName: null,
		}),
	[SET_REP]: (st, { organizationName, repositoryName }) => (
		{
			error: null,
			branches: null,
			organizationName,
			repositoryName,
		}),
	[SET_BRANCHES_LIST]: (st, { branches }) => (
		{
			...st,
			branches,
		}),
};

export default (st = initialState, action) =>
{
	const handler = map[ action.type ];
	return handler ? handler(st, action) : st;
};