import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Spinner from './../../components/spinner/spinner.component';

import { ProfileContainer } from './user-profile.styles';

const GET_CURRENT_USER_ID = gql`
  {
    currentUserId @client
  }
`;

const GET_USER = gql`
    query getUser($userId: ID!) {
        getUser(userId: $userId) {
            name
            profileImage
            country
            mostPlayed {
                _id
                name
                artistName
            }
        }
    }
`;

const UserProfile = () => {
    const { currentUserId } = useQuery(GET_CURRENT_USER_ID).data;

    const { data, loading, error } = useQuery(
        GET_USER,
        { variables: { userId: currentUserId } }
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error.message}</p>;

    const user = data.getUser;
    const mostPlayed = data.getUser.mostPlayed;

    return (
        <div className='main-container'>
            <ProfileContainer>
                <h1>User Profile</h1>
                <p>{user.name}</p>
                <p>{user.country}</p>
                <p>{mostPlayed.name}</p>
                <p>{mostPlayed.artistName}</p>
            </ProfileContainer>
        </div>
    );
};

export default UserProfile;
