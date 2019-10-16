import React from 'react';
import { connect } from 'react-redux';

import { default as UserDropdown } from '../UserDropdown/UserDropdown.container';

import { createStructuredSelector } from 'reselect';
import { selectIsAuthed } from '../../redux/auth/auth.selectors';

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

const mapStateToProps = createStructuredSelector({
  isAuthed: selectIsAuthed
});

export default connect(
  mapStateToProps
)(Header);