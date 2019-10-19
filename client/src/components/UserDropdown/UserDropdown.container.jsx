import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import UserDropdown from './UserDropdown';

const GET_USER = gql`
    query getUser($userId: ID!) {
        getUser(userId: $userId) {
            profileImage
        }
    }
`;

const getCurrentUserId = () => {
    const accessToken = Cookies.get('accessToken');
    const { userId } = jwtDecode(accessToken);

    return userId;
};

const UserDropdownContainer = () => (
    <Query
        query={GET_USER}
        variables={{ userId: getCurrentUserId() }}>
        {
            ({ loading, data }) => {
                if (loading) return <UserDropdown />;
                
                const { profileImage } = data.getUser;
                return <UserDropdown profileImage={profileImage} />
            }
        }
    </Query>
);

export default UserDropdownContainer;