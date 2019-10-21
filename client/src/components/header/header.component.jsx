import React from 'react';

import { default as UserDropdown } from '../user-dropdown/user-dropdown.container';

import './header.styles.scss';

const Header = ({ isAuthed }) => (
  <header className='Main-header'>
    <div className='Main-header-container'>
      <div className='logo-wrapper'>
        euphony.
      </div>
      {
        isAuthed ?
          <div className='User-wrapper'>
            <UserDropdown />
          </div> : null
      }
    </div>
  </header>
);

export default Header;