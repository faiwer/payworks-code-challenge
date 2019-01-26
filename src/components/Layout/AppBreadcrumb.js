import React from 'react';
import { Breadcrumb } from 'antd';
import { withRouter, Link } from 'react-router-dom';

// simple parse-mechanism, it should be replaced by something
// more robust in a real application
const parseRoute = url =>
{
	if(url.startsWith('/rep'))
	{
		const [,, org, rep] = url.split('/');
		return (
		[
			{ label: org, url: `/org/${org}` },
			{ label: rep },
		]);
	}
	else return []; // list or some error
};

const AppBreadcrumb = ({ location }) =>
{
	const path = location.pathname |> parseRoute;
	if(!path.length)
		return null;

	return <Breadcrumb className="cch-breadcrumb">
		<For each="item" of={path}>
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
};

export default AppBreadcrumb |> withRouter;