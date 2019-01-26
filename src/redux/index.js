import { combineReducers } from 'redux';
import organizationReducer from './organization/reducer';
import repositoryReducer from './repository/reducer';

export const reducer = combineReducers(
	{
		organization: organizationReducer,
		repository: repositoryReducer,
	});