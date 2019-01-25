import React from 'react';
import { Input } from 'antd';

export default () =>
	<div className="cch-filter">
		<Input.Search
			className="cch-filter-search"
			placeholder="Enter an organization name"
			enterButton
		/>
	</div>;

// todo: filter language
// todo: sort by: rank || number of forks