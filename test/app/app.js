/* global beforeEach, afterEach */
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import sinon from 'sinon';

import Root from '../../src/components/Root';
import { reducer } from '../../src/redux/index';
import * as apis from '../../src/api/index';
import mockRepList from '../mock/payworks-rep-list.json';
import { waitUntil } from '../testTools';

const mountRoot = () =>
	{
		const store = createStore(
			reducer,
			undefined,
			applyMiddleware(thunkMiddleware)
		);

		return mount(
			<Provider {...{ store }}>
				<MemoryRouter>
					<Root/>
				</MemoryRouter>
			</Provider>);
	};

describe('App', () =>
{
	let getRepListStub = null;
	beforeEach(() =>
		{
			getRepListStub = sinon
				.stub(apis, 'getRepositoriesList')
				.returns(mockRepList);
		});
	afterEach(() =>
		{
			apis.getRepositoriesList.restore();
		});

	const PAGE_LIMIT = 3;

	it('Simple Test', () =>
	{
		const $app = mountRoot();
		expect($app.find('.cch-content')).length(1);
		// filter panel
		expect($app.find('span.cch-filter-search')).length(1);
	});

	it('Search projects', async () =>
	{
		const $app = mountRoot();

		$app
			.find('.cch-filter-search input')
			.simulate('change', { target: { value: 'test-org' } })
			.simulate('keydown',
				{
					keyCode: 13,
					target: { value: 'test-org' }
				});

		expect(getRepListStub.calledOnce).true;
		expect(location.href).contains('/org/test-org');

		// list is loaded and rendered
		await waitUntil(() =>
			{
				$app.update();
				expect($app.find('div.cch-repository-listitem').length).above(1);
				expect($app.find('.ant-pagination-item').length).above(1);
			});

		// paginate
		$app
			.find('li.ant-pagination-item[title=2]')
			.at(0)
			.simulate('click');
		expect(location.href).contains('page=2');

		$app.update();
		const orgName = $app
			.find('div.cch-repository-listitem')
			.at(0)
			.find('.cch-rep-li-name')
			.text();
		// pagination actually works
		expect(orgName).eq(mockRepList[PAGE_LIMIT].name);
	});

	// the same way we can test end-to-end everything, including
	// route changes, element renders, redux store changes, etc.
});