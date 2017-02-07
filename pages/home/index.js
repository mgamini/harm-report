import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';
import DatePage from '../date';


class HomePage extends React.Component {

  static propTypes = {
    latest: PropTypes.shape({
      date: PropTypes.string.isRequired,
      data: PropTypes.array.isRequired,
      next: PropTypes.string,
      prev: PropTypes.string,
    })
  };

  componentWillMount() {
    console.log('will mount home')
  }

  componentDidMount() {
    document.title = title;
  }

  render() {
    return <DatePage date={this.props.latest} />;
  }

}

export default HomePage;
