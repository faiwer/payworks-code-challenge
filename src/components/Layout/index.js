import React from 'react';
import { Layout } from 'antd';

import AppFooter from './AppFooter';
import AppBreadcrumb from './AppBreadcrumb';
const { Header, Content } = Layout;

export default ({ children, path }) =>
{
	return <Layout className="layout">
		<Header/>
		<Content className="cch-root-content">
			<AppBreadcrumb {...{ path }}/>
			<div className="cch-content">
				{children}
			</div>
		</Content>
		<AppFooter/>
	</Layout>;
};