import axios from 'axios';

const prefix = '/';

const handleResponse = ({ status, data }) =>
	{
		if(status !== 200)
			throw new Error('Bad server response');

		return data;
	};

const handleQueryErr = err =>
	{
		throw new Error('Bad server response');
	};

export const get = (uri, params) =>
	axios
		.get(prefix + uri, params)
		.then(handleResponse, handleQueryErr);

export const wait = delay => new Promise(resolve => setTimeout(resolve, delay));