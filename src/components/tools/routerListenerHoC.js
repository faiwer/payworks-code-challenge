import React from 'react';
import { withRouter } from 'react-router-dom';
import { createSelector } from 'reselect';

/**
 * It's a HoC for listening React-Router URL changes
 * and updated the provided Component.
 *
 * Generally this wrapper works the same way as
 * react-redux connect does.
 */
export default mapUrlToProps => Component =>
{
	const Wrapper = class extends React.PureComponent
	{
		// memoize last calculation to prevent unnecessary updates (memo)
		map = createSelector(
			props => props.location,
			props => props.history,
			props => props.match,
			(location, history, match) =>
			{
				// the same thing as mapStateToProps in react-redux,
				// but for react-router
				return mapUrlToProps({ history, location, match });
			}
		);

		componentDidMount() // listen to URL changes
		{
			const { history } = this.props;
			this.unlisten = history.listen((location, action) =>
				{
					// it's probably better than struggling with state
					// with the same result
					this.forceUpdate();
				});
		}

		componentWillUnmount() // unlisten
		{
			this.unlisten();
		}

		render()
		{
			const queryProps = this.map(this.props);

			return <Component
				{...this.props}
				{...queryProps}
			/>;
		}
	};

	return withRouter(Wrapper);
};