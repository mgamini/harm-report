import React, { PropTypes } from 'react';
import history from '../../core/history';
import s from './ReportLink.css';
import Link from './Link.js';
import HarmIcon from '../Button/HarmIcon.js';

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
			<article className={`${s['report-entry']} ${featured}`} >
				<div className={s.harms}>
					{this.props.report.harms.map((harm) =>
						<HarmIcon
							id={`${this.props.report.id}-${harm.id}`}
							slug={harm.id}
							name={harm.group}
							featured={this.props.featured}
							key={`${this.props.report.id}-${harm.id}`}
							className={s['harm-icon']} />
					)}
				</div>
				<div className={s.report}>
					<Link className={s['report-link']} to={`/r/${this.props.report.id}`}>
						<p>{this.props.report.title}</p>
					</Link>
				</div>
			</article>
		)
	}
}

export default ReportLink;