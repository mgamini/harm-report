/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
* https://gist.githubusercontent.com/koistya/a32919e847531320675764e7308b796a/raw/articles.json
 */



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
    document.title = title;
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
