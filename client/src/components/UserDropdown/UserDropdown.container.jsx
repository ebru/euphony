import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import UserDropdown from './UserDropdown';

const GET_USER = gql`
    query user($_id: ID!) {
        user(_id: $_id) {
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
        variables={{ _id: getCurrentUserId() }}>
        {
            ({ loading, data }) => {
                if (loading) return <UserDropdown />;
                return <UserDropdown userProfileImage={data.user.profileImage} />
            }
        }
    </Query>
);

export default UserDropdownContainer;