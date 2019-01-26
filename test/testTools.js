const WAIT_DELAY = 50; // ms
const WAIT_LIMIT = 30; // times

// setTimeout through async-workflow for async-methods
const timeoutAsync = (asyncFn, delay) => new Promise(
	(resolve, reject) =>
	{
		setTimeout(() =>
			{
				try
				{
					asyncFn()
						.then(resolve)
						.catch(reject);
				}
				catch(err)
				{
					reject(err);
				}
			}, delay);
	});

// this methods executes fn many times until it stops throwing errors
// or the limit of tryouts is exceed
export const waitUntil = (fn, counter = 0) =>
	new Promise(async (resolve, reject) =>
	{
		try
		{
			fn();
		}
		catch(err)
		{
			if(counter >= WAIT_LIMIT)
			{
				console.log('reject-before');
				reject(err);
				console.log('reject-after');
				return;
			}

			timeoutAsync(
				() => waitUntil(fn, counter + 1),
				WAIT_DELAY
			)
				.then(resolve)
				.catch(reject);
			return; // do not resolve, just make another tryout
		}

		resolve();
	});