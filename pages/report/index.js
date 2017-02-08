import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';

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

	componentWillMount() {
		console.log('will mount')
	}

  componentDidMount() {
    // document.title = title;
  }

  render() {
    let data = this.props.report.data;
		console.log('rendering report page')
    return (
      <Layout className={s.content}>
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
