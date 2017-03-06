import React, { PropTypes } from 'react';
import s from './HarmIcon.css';
import Link from '../Link/Link.js';
import ReactTooltip from 'react-tooltip';

const moment = require('moment');

class HarmIcon extends React.Component {
  static propTypes = {
		id: PropTypes.string,
		slug: PropTypes.string,
		name: PropTypes.string,
		featured: PropTypes.bool,
  };

	render() {
		let iconClass = s[`harm-icon-${this.props.id}`];
		console.log('rendering harmIcon')
		return (
			<div data-tip data-for={`tip-${this.props.id}`} className={`${this.props.className} ${s['harm-icon']} ${iconClass} ${this.props.featured && s.featured}`} to={`/h/${this.props.slug}`}>
				<img src={`/assets/img/icons/icon_${this.props.slug}.svg`} className={s.icon} />
				<ReactTooltip id={`tip-${this.props.id}`} type='dark' effect='solid'>
					<span>{this.props.name}</span>
				</ReactTooltip>
			</div>
			/*<Link data-tip data-for={`tip-${this.props.id}`} className={`${this.props.className} ${s['harm-icon']} ${iconClass} ${this.props.featured && s.featured}`} to={`/h/${this.props.slug}`}>
				<img src={`/assets/img/icons/icon_${this.props.slug}.svg`} className={s.icon} />
				<ReactTooltip id={`tip-${this.props.id}`} type='dark' effect='solid'>
					<span>{this.props.name}</span>
				</ReactTooltip>
			</Link>*/
		)
	}
}

export default HarmIcon;