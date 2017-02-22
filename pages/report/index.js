import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import DateNavLink from '../../components/Link/DateNavLink';

class ReportPage extends React.Component {

  static propTypes = {
    report: PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.string,
      data: PropTypes.shape({
        title: PropTypes.string,
        brief: PropTypes.string,
        reliability: PropTypes.number,
        source: PropTypes.string,
        harms: PropTypes.array,
      })
    })
  };

  render() {
    let data = this.props.report.data;

		console.log('rendering report page')
    return (
      <Layout className={s.content}>
        <div className={s.fixedRight}>
          <DateNavLink type={'current'} date={this.props.report.date} />
        </div>
        <h1>{data.title}</h1>
        <p>{data.brief}</p>
        <ul>
        {data.harms.map((harm, i) =>
          <li key={i}><strong>{harm.group}</strong> - {harm.description}</li>
        )}
        </ul>
      </Layout>
    );
  }

}

export default ReportPage;
