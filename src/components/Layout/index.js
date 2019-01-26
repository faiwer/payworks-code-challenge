import React from 'react';
import { Layout } from 'antd';

import AppFooter from './AppFooter';
import AppBreadcrumb from './AppBreadcrumb';
import AppFilter from '../Filter';

const { Header, Content } = Layout;

export default ({ children }) =>
{
	return <Layout className="layout">
		<Header className="cch-root-header">
			<AppFilter/>
		</Header>
		<Content className="cch-root-content">
			<AppBreadcrumb/>
			<div className="cch-content">
				{children}
			</div>
		</Content>
		<AppFooter/>
	</Layout>;
};