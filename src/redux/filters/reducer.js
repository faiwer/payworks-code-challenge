import { SET_FILTER } from './actions';

const initialState =
{
	search: null,
	sort: null,
	lang: null,
};

const map =
{
	[SET_FILTER]: (st, { field, value }) => (
	{
		...st,
		[field]: value,
	}),
};

export default (st = initialState, action) =>
{
	const handler = map[ action.type ];
	return handler ? handler(st, action) : st;
};