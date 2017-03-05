import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import DateNavLink from '../../components/Link/DateNavLink';
import HarmIcon from '../../components/Button/HarmIcon';

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
      <Layout className={s.main}>
        <article className={s.content}>
          <h1 className={s.title}>{data.title}</h1>
          {data.brief.split('\n').map((item, key) => <p key={key}>{item}</p>)}
          <ul className={s.harms}>
          {data.harms.map((harm, i) =>
            <li key={i} className={s.harmEntry}>
              <HarmIcon
							id={`${this.props.report.id}-${harm.id}`}
							slug={harm.id}
							name={harm.group}
							featured={true}
							key={`${this.props.report.id}-${harm.id}`} />
              <div className={s.harmDescription}>
                {harm.description}
              </div>
            </li>
          )}
          </ul>
        </article>
        <div className={s.fixedRight}>
          <DateNavLink type={'current'} date={this.props.report.date} />
        </div>
      </Layout>
    );
  }

}

export default ReportPage;
