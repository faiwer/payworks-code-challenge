const initialState =
{
};

export const reducer = (st, action) =>
{
	if(!st) // null
		st = initialState;

	return st;
};