import React, { PropTypes } from 'react';
import history from '../../core/history';
import s from './DateNavLink.css';
import Link from './Link.js';

const moment = require('moment');

class DateNavLink extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['prev', 'next', 'current']),
    date: PropTypes.string
  };

	render() {
		console.log('rendering datenavlink')
		let date = moment(this.props.date);
		let type = this.props.type;

		return (
			<Link className={`${s.link} ${s[type]}`} to={`/d/${date.format('YYYYMMDD')}`}>
				<span className={s.date}>{date.format('DD MMM')}</span>
				<span className={s.year}>{date.format('YYYY')}</span>
			</Link>
		)
	}
}

export default DateNavLink;