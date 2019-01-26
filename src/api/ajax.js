import axios from 'axios';

const prefix = 'https://api.github.com';

const QueryErr = response => (
	{
		queryStatus: response.status,
		// error by default
		message: 'Bad server response',
	});

const handleResponse = response => response.data;

const handleQueryErr = err =>
{
	throw QueryErr(err.response);
};

export const get = (uri, params) =>
	axios
		.get(prefix + uri, params)
		.then(handleResponse, handleQueryErr);

export const wait = delay => new Promise(resolve => setTimeout(resolve, delay));