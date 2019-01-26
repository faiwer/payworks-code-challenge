import { combineReducers } from 'redux';
import filtersReducer from './filters/reducer';
import organizationReducer from './organization/reducer';
import repositoryReducer from './repository/reducer';

export const reducer = combineReducers(
	{
		organization: organizationReducer,
		filters: filtersReducer,
		repository: repositoryReducer,
	});