import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';

import BranchListItem from '../../src/components/BranchesList/BranchListItem';

describe('Repository', () =>
{
	// simple unit-test for one dump-component
	it('BranchListItem', () =>
	{
		const branch =
			{
				name: 'test-branch',
				commit: { sha: 'sha', url: 'url' },
			};
		const $branch = mount(<BranchListItem {...{ branch }}/>);

		expect($branch.find('h3').text()).contains('test-branch');
		const $commit = $branch.find('.ant-card-body a');
		expect($commit.text()).contains('sha');
		expect($commit.prop('href')).contains('url');
	});

	// many other tests... :)
});