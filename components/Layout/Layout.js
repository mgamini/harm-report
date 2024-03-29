import React, { PropTypes } from 'react';
import cx from 'classnames';
import Header from './Header';
import Footer from '../Footer';
import s from './Layout.css';

class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.container} ref={node => (this.root = node)}>
          <Header />
          <main className={s.main}>
            <div {...this.props} className={cx(s.content, this.props.className)} />
            <Footer />
          </main>
        </div>
      </div>
    );
  }
}

export default Layout;
