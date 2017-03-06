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

    return (
      <Layout className={s.main}>
        <div className={s.fixedRight}>
          <DateNavLink type={'current'} date={this.props.report.date} />
        </div>
        <article className={s.content}>
          <h1 className={s.title}>{data.title}</h1>
          {data.brief.split('\n').map((item, key) => <p key={`brief_${key}`}>{item}</p>)}
          <ul className={s.harms}>
          {data.harms.map((harm, i) =>
            <li key={i} className={s.harmEntry}>
              <div className={s.harmIcons}>
                <HarmIcon
                id={`${this.props.report.id}-${harm.id}`}
                slug={harm.id}
                name={harm.group}
                featured={true}
                key={`${this.props.report.id}-${harm.id}`}
                className={s.harmIcon} />
              </div>
              <div className={s.harmDescription}>
                <h2 className={s.harmTitle}>{harm.group}</h2>
                <h3 className={s.harmTerm}>{harm.term}</h3>
                {harm.description.split('\n').map((item, key) => <p key={`harm_${key}`}>{item}</p>)}
                {}
                <h4>Sources:</h4>
                <ul className={s.harmSources}>
                  {harm.sources.map((source, i) =>
                    <li key={`${harm.id}-source-${i}`} className={s.harmSource}>
                      <h5 className={s.harmSourceTitle}>
                        <a href={source.link}>{source.title}</a>
                      </h5>
                      <h6 className={s.harmSourceName}>{source.name}</h6>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          )}
          </ul>
        </article>
      </Layout>
    );
  }

}

export default ReportPage;
