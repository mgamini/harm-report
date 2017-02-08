import React, { PropTypes } from 'react';
import history from '../../core/history';
import s from './ReportLink.css';
import Link from './Link.js';

const moment = require('moment');

class ReportLink extends React.Component {
  static propTypes = {
		featured: PropTypes.bool,
		report: PropTypes.object
  };

	render() {
		let featured = this.props.featured ? s.featured : s.normal;

		console.log('rendering reportlink')
		return (
			<Link className={featured} to={`/r/${this.props.report.id}`}>
				<p>{this.props.report.title}</p>
			</Link>
		)
	}
}

export default ReportLink;