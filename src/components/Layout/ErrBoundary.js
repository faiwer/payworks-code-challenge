import React from 'react';
import { Alert } from 'antd';

const ErrorAlert = ({ error }) =>
{
	console.log(error); // for debug case
	return <Alert
		message={this.state.error.message}
		type="error"
	/>;
};

export default Component => class ErrorBoundary extends React.PureComponent
{
	state = { error: null };

	componentDidCatch(error)
	{
		this.setState({ error });
	}

	render()
	{
		if(this.state.error)
			<ErrorAlert error={this.state.error}/>;

		return <Component {...this.props}/>;
	}
};