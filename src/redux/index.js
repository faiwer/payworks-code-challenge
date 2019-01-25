import {
	initialState as filtersInitialState,
	map as filtersMap } from './filters';

const initialState =
{
	...filtersInitialState,
	organization: null,
};

export const reducer = (st, action) =>
{
	if(!st) // null
		st = initialState;

	if(filtersMap[action.type])
		return filtersMap[action.type](st, action);

	return st;
};