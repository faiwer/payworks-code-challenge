export const SET_FILTER = 'FILTERS_SET';
export const aSetFilter = (field, value) => (
	{
		type: SET_FILTER,
		field,
		value
	});