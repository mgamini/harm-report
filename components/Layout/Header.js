import React from 'react';
import Navigation from './Navigation';
import Link from '../Link';
import s from './Header.css';

class Header extends React.Component {

  render() {
    return (
      <header ref={node => (this.root = node)} className={s.header}>
        <Link className={s.logo} to="/">
          <h1>
            <span className={s.harm}>Harm</span>
            <span className={s.report}>.Report</span>
          </h1>
        </Link>
      </header>
    );
  }

}

export default Header;
