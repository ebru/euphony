import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const UserDropdown = ({ userProfileImage }) => {
    const menu = (
        <Menu>
            <Menu.Item key='0'><Link to='/logout'>Log Out</Link></Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']} placement='bottomRight'>
            <Link to='#'><Avatar src={userProfileImage} size='large' /></Link>
        </Dropdown>
    );
};

export default UserDropdown;