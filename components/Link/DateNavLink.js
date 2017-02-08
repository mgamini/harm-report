import React, { PropTypes } from 'react';
import history from '../../core/history';
import s from './DateNavLink.css';
import Link from './Link.js';

const moment = require('moment');

class DateNavLink extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['prev', 'next']),
    date: PropTypes.string
  };

	render() {
		console.log('rendering datenavlink')
		let date = moment(this.props.date);

		return (
			<Link className={s.link} to={`/d/${date.format('YYYYMMDD')}`}>
				<p className={s.date}>{date.format('DD MMM')}</p>
				<p className={s.year}>{date.format('YYYY')}</p>
			</Link>
		)
	}
}

export default DateNavLink;