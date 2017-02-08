import React from 'react';
import Link from '../Link';
import s from './Layout.css';

class Navigation extends React.Component {

  render() {
    return (
      <nav className={s.nav} ref={node => (this.root = node)}>
        <Link className="" to="/">Home</Link>
        <Link className="mdl-navigation__link" to="/about">About</Link>
      </nav>
    );
  }

}

export default Navigation;
