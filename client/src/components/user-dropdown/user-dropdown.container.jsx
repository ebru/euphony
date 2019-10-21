import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import userUtils from './../../utils/user.utils';

import UserDropdown from './user-dropdown.component';

const GET_USER = gql`
    query getUser($userId: ID!) {
        getUser(userId: $userId) {
            profileImage
        }
    }
`;

const UserDropdownContainer = () => (
    <Query
        query={GET_USER}
        variables={{ userId: userUtils.getCurrentUserId() }}>
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