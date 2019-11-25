import React from 'react';
import { Link } from 'react-router-dom';

import UserDropdown from './../user-dropdown/user-dropdown.component';
import ShareSongModal from './../share-song-modal/share-song-modal.component';

import './header.styles.scss';

const Header = ({ isAuthed }) => {
  return (
    <header className='header-container'>
      <div className='logo-wrapper'>
        <Link to='/'>euphony.</Link>
      </div>
      {
        isAuthed ?
          <div className='user-wrapper'>
            <ShareSongModal />
            <UserDropdown />
          </div> : null
      }
    </header>
  )
};

export default Header;