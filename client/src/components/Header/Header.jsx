import React from 'react';
import Cookies from 'js-cookie';

import { default as UserDropdown } from '../UserDropdown/UserDropdown.container';

import './Header.scss';

const Header = () => {
  const isAuthed = Cookies.get('accessToken') ? true : false

  return (
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
  )
};

export default Header;