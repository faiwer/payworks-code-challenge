import {
	SET_ERROR,
	CLEAR_ERROR,
	SET_LOADING,
	CLEAR_ORG,
	SET_ORG,
	SET_REP_LIST } from './actions';

const initialState =
{
	organizationName: null,
	error: null,
	isLoading: false,
	repositories: null,
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
	[CLEAR_ORG]: st => (
		{
			...st,
			error: null,
			repositories: null,
			organizationName: null,
		}),
	[SET_ORG]: (st, { organizationName }) => (
		{
			error: null,
			repositories: null,
			organizationName,
		}),
	[SET_REP_LIST]: (st, { repositories }) => (
		{
			...st,
			repositories,
		}),
};

export default (st = initialState, action) =>
{
	const handler = map[ action.type ];
	return handler ? handler(st, action) : st;
};