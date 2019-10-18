import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import UserDropdown from './UserDropdown';

const GET_USER = gql`
    query user($sid: String!) {
        user(sid: $sid) {
            profileImage
        }
    }
`;

const getCurrentUserId = () => {
    const accessToken = Cookies.get('accessToken');
    const { sid } = jwtDecode(accessToken);

    return sid;
};

const UserDropdownContainer = () => (
    <Query
        query={GET_USER}
        variables={{ sid: getCurrentUserId() }}>
        {
            ({ loading, data }) => {
                if (loading) return <UserDropdown />;
                return <UserDropdown userProfileImage={data.user.profileImage} />
            }
        }
    </Query>
);

export default UserDropdownContainer;