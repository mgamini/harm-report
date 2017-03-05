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

    let next = !!this.props.date.next ?
      <DateNavLink type={'next'} date={this.props.date.next} /> : null;
    let prev = !!this.props.date.prev ?
      <DateNavLink type={'prev'} date={this.props.date.prev} /> : null;

    return (
      <Layout className={s.main}>
        <div className={s.fixedRight}>
          <DateNavLink type={'current'} date={this.props.date.date} />
          {prev}
        </div>
        <div className={s.fixedLeft}>
          {next}
        </div>
        <section className={s.content}>
          {data.map((report, idx) =>
            <ReportLink featured={idx === 0} report={report} key={report.id} />
          )}
        </section>
      </Layout>
    );
  }

}

export default DatePage;
