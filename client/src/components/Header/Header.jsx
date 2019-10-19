import React from 'react';

import { default as UserDropdown } from '../UserDropdown/UserDropdown.container';

import './Header.scss';

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