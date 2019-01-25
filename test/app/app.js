import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';

describe('App', () =>
{
	it('Simple Test', () =>
	{
		const $app = mount(<div>Blank</div>);
		expect($app.text()).eq('Blank');
	});
});