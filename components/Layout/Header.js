import React from 'react';
import Navigation from './Navigation';
import Link from '../Link';
import s from './Header.css';

class Header extends React.Component {

  render() {
    return (
      <header ref={node => (this.root = node)}>
        <div>
          <Link to="/">
            Harm.Report
          </Link>
        </div>
      </header>
    );
  }

}

export default Header;
