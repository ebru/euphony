import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Cookies from 'js-cookie';

import UserDropdown from './UserDropdown';

const GET_USER = gql`
    query user($sid: String!) {
        user(sid: $sid) {
            profileImage
        }
    }
`;

const UserDropdownContainer = () => (
    <Query
        query={GET_USER}
        variables={{ sid: Cookies.get('currentUserSid') }}>
        {
            ({ loading, data }) => {
                if (loading) return <UserDropdown />;
                return <UserDropdown userProfileImage={data.user.profileImage} />
            }
        }
    </Query>
);

export default UserDropdownContainer;