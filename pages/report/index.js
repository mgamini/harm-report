import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';

class ReportPage extends React.Component {

  // static propTypes = {
  //   reports: PropTypes.array.isRequired,
  // };

	componentWillMount() {
		console.log('will mount')
	}

  componentDidMount() {
    // document.title = title;
  }

  render() {
		console.log('rendering report page')
    return (
      <Layout className={s.content}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <h4>Articles</h4>
        {/*{this.props.reports.map((reportSet, i) =>
          <div className="dayEntry" key={i}>
            <p>{reportSet.date}</p>
            <ul>
              {reportSet.reports.map((report, j) =>
                <li key={j}>{report.title}</li>
              )}
            </ul>
          </div>
        )}*/}
      </Layout>
    );
  }

}

export default ReportPage;
