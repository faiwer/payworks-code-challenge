import React from 'react';
import { Breadcrumb } from 'antd';
import { withRouter, Link } from 'react-router-dom';

const root = { url: '/', label: 'App' };

// simple parse-mechanism, it should be replaced by something
// more robust in a real application
const parseRoute = url =>
{
	if(url.startsWith('/org'))
		return (
		[
			root,
			{ label: 'Organization' },
		]);
	else return [root]; // list or some error
};

const AppBreadcrumb = ({ location }) =>
	<Breadcrumb className="cch-breadcrumb">
		<For each="item" of={location.pathname |> parseRoute}>
			<Breadcrumb.Item key={item.url + item.label}>
				<If condition={item.url}>
					<Link to={item.url}>
						{item.label}
					</Link>
				</If>
				<If condition={!item.url}>
					{item.label}
				</If>
			</Breadcrumb.Item>
		</For>
	</Breadcrumb>;

export default AppBreadcrumb |> withRouter;