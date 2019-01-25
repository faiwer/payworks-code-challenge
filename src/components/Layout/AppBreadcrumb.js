import React from 'react';
import { Breadcrumb } from 'antd';

export default ({ path }) =>
	<Breadcrumb className="cch-breadcrumb">
		<For each="item" of={path}>
			<Breadcrumb.Item key={item.url}>
				{item.label}
			</Breadcrumb.Item>
		</For>
	</Breadcrumb>;