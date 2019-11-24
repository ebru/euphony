import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Spinner from './../../components/spinner/spinner.component';

import {
    ProfileContainer,
    ProfileInfo,
    CountrySpan,
    ProfileContent,
    ProfileImage
} from './user-profile.styles';

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
                <ProfileInfo>
                    {
                        data.getUser.profileImage ?
                            <ProfileImage>
                                <img src={user.profileImage} />
                            </ProfileImage> : null
                    }
                    <div>
                        <h1>{user.name} <CountrySpan>/{user.country}</CountrySpan></h1>
                        <p>{mostPlayed.name}</p>
                        <p>{mostPlayed.artistName}</p>
                    </div>
                </ProfileInfo>
                <ProfileContent>
                    in progress.
                </ProfileContent>
            </ProfileContainer>
        </div>
    );
};

export default UserProfile;
