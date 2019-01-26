import qs from 'query-string';
import _ from 'lodash';

const dateFormatter = new Intl.DateTimeFormat(navigator.language);
export const displayDate = dateStr =>
{
	const date = new Date(dateStr);
	return dateFormatter.format(date); // todo
};

// like _.compact, but for objects. omit all nil values
const compactObj = obj => _.transform(obj, (acc, val, key) =>
	{
		if(!_.isNil(val))
			acc[key] = val;
	}, {});

// better version of qs.stringify
export const genQueryString = obj =>
{
	return '?' + qs.stringify(compactObj(obj));
};