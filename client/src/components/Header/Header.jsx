import React from 'react';
import { connect } from 'react-redux';

import UserDropdown from '../UserDropdown/UserDropdown';

import { createStructuredSelector } from 'reselect';
import { selectIsAuthed } from '../../redux/auth/auth.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './Header.scss';

const Header = ({ isAuthed, currentUser }) => (
  <header className='Main-header'>
    <div className='Main-header-container'>
      <div className='Logo-wrapper'>
        <img src='assets/images/logo.png' width='170px' alt='logo' />
      </div>
      {
        isAuthed ?
          <div className='User-wrapper'>
            <UserDropdown userProfileImage={currentUser.profileImage} />
          </div> : null
      }
    </div>
  </header>
);

const mapStateToProps = createStructuredSelector({
  isAuthed: selectIsAuthed,
  currentUser: selectCurrentUser
});

export default connect(
  mapStateToProps
)(Header);