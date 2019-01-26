import { combineReducers } from 'redux';
import filtersReducer from './filters/reducer';
import organizationReducer from './organization/reducer';

export const reducer = combineReducers(
	{
		organization: organizationReducer,
		filters: filtersReducer,
	});