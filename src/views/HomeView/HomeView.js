import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import DuckImage from './Duck.jpg'
import CustomMenu from '../../components/Menu/menu'
import classes from './HomeView.scss'
import {actions } from '../../redux/modules/menu'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
	menu: state.menu
});
export class HomeView extends React.Component {
	static propTypes = {
		counter: PropTypes.array.isRequired,
		menu: PropTypes.object.isRequired,
		doubleAsync: PropTypes.func.isRequired,
		increment: PropTypes.func.isRequired
	};

	render() {
		return (
			<CustomMenu menu={this.props.menu}/>
		)
	}
}

export default connect(mapStateToProps, {actions})(HomeView)
