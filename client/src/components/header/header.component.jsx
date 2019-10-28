import React from 'react';
import { Link } from 'react-router-dom';

import UserDropdown from '../user-dropdown/user-dropdown.component';

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