import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import UserDropdown from './UserDropdown';

const GET_USER = gql`
    {
        user(sid: "st943c9lgd92wk98aw3bfxcvb") {
            profileImage
        }
    }
`;

const UserDropdownContainer = () => (
    <Query query={GET_USER}>
        {
            ({ loading, data }) => {
                if (loading) return <UserDropdown />;
                return <UserDropdown userProfileImage={data.user.profileImage} />
            }
        }
    </Query>
);

export default UserDropdownContainer;