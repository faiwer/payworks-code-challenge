import { get } from './ajax';

export const getRepositoriesList = orgName =>
	get(`/orgs/${orgName}/repos`)
		.catch(err =>
		{
			if(err.queryStatus === 404)
				// normal response for unknown organizations
				throw new Error(`Organization isn't found`);

			throw err;
		});