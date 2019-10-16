import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

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
        variables={{ sid: "st943c9lgd92wk98aw3bfxcvb" }}>
        {
            ({ loading, data }) => {
                if (loading) return <UserDropdown />;
                return <UserDropdown userProfileImage={data.user.profileImage} />
            }
        }
    </Query>
);

export default UserDropdownContainer;