import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import ReportLink from '../../components/Link/ReportLink';
import DateNavLink from '../../components/Link/DateNavLink';


const moment = require('moment');

class DatePage extends React.Component {

  static propTypes = {
    date: PropTypes.shape({
      date: PropTypes.string.isRequired,
      data: PropTypes.array.isRequired,
      next: PropTypes.string,
      prev: PropTypes.string,
    })
  };

	componentWillMount() {
		console.log('will mount')
	}

  componentDidMount() {
    // document.title = title;
  }

  render() {
		console.log('rendering date page')
    let data = this.props.date.data;
    let date = moment(this.props.date.date);

    let next = !!this.props.date.next ?
      <DateNavLink type={'next'} date={this.props.date.next} /> : null;
    let prev = !!this.props.date.prev ?
      <DateNavLink type={'prev'} date={this.props.date.prev} /> : null;

    return (
      <Layout className={s.content}>
        <div className={s.fixedRight}>
          <h1 className={s.dateTitle}>
            <span className={s.date}>{date.format('DD MMM')}</span>
            <span className={s.year}>{date.format('YYYY')}</span>
          </h1>
          {prev}
        </div>
        <div className={s.fixedLeft}>
          {next}
        </div>
        {data.map((report, idx) =>
          <ReportLink featured={idx === 0} report={report} key={report.id} />
        )}
      </Layout>
    );
  }

}

export default DatePage;
