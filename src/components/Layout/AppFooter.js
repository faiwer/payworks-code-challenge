import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const USER_LINK = 'https://linkedin.com/in/faiwer/';

export default () =>
	<Footer className="cch-footer">
		{`Code Challenge, `}
		<a href={USER_LINK}>
			Zubashev Stepan
		</a>
	</Footer>;