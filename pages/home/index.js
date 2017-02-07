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
import Link from '../../components/Link/Link.js';

class HomePage extends React.Component {

  static propTypes = {
    reports: PropTypes.array.isRequired,
  };

  componentWillMount() {
    console.log('will mount home')
  }

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout className={s.content}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <h4>Articles</h4>
        {this.props.reports.map((report, i) =>
          <div className="dayEntry" key={i}>
            <h3>{report.title}</h3>
            <p>{report.brief}</p>
          </div>
        )}
      </Layout>
    );
  }

}

export default HomePage;
