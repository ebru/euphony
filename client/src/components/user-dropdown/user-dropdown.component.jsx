import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Menu, Dropdown, Avatar } from 'antd';

import userUtils from './../../utils/user.utils';

const GET_USER = gql`
    query getUser($userId: ID!) {
        getUser(userId: $userId) {
            profileImage
        }
    }
`;

const menu = (
    <Menu>
        <Menu.Item key='0'><Link to='/profile'>Profile</Link></Menu.Item>
        <Menu.Item key='1'><Link to='/settings'>Settings</Link></Menu.Item>
        <Menu.Divider />
        <Menu.Item key='2'><Link to='/logout'>Log Out</Link></Menu.Item>
    </Menu>
);

const UserDropdown = () => {
    const { data, loading } = useQuery(
        GET_USER,
        { variables: { userId: userUtils.getCurrentUserId() } }
    );

    if (loading) return <Avatar icon='user' size='large' />

    const { profileImage } = data.getUser;

    return (
        <Dropdown overlay={menu} trigger={['click']} placement='bottomRight'>
            <Link to='#'>
                <Avatar
                    src={profileImage}
                    icon='user'
                    size='large'
                />
            </Link>
        </Dropdown>
    );
};

export default UserDropdown;