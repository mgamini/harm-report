import React, { PropTypes } from 'react';
import s from './HarmIcon.css';
import Link from '../Link/Link.js';

const moment = require('moment');

class HarmIcon extends React.Component {
  static propTypes = {
		id: PropTypes.string,
		name: PropTypes.string,
		featured: PropTypes.bool
  };

	render() {
		let iconClass = s[`harm-icon-${this.props.id}`];
		console.log('rendering harmIcon')
		return (
			<Link className={`${s['harm-icon']} ${iconClass} ${this.props.featured && s.featured}`} to={`/h/${this.props.id}`}>
				<p>{this.props.name}</p>
			</Link>
		)
	}
}

export default HarmIcon;