import React from 'react';
import { Link } from 'react-router-dom';

import { default as UserDropdown } from '../user-dropdown/user-dropdown.container';

import './header.styles.scss';

const Header = ({ isAuthed }) => (
  <header className='header-container'>
    <div className='logo-wrapper'>
      <Link to='/'>euphony.</Link>
    </div>
    {
      isAuthed ?
        <div className='user-wrapper'>
          <UserDropdown />
        </div> : null
    }
  </header>
);

export default Header;