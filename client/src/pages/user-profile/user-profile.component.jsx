import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import userUtils from './../../utils/user.utils';

import Spinner from './../../components/spinner/spinner.component';

import './user-profile.styles.scss';

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
    const { data, loading, error } = useQuery(
        GET_USER,
        { variables: { userId: userUtils.getCurrentUserId() } }
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error.message}</p>;

    const user = data.getUser;
    const mostPlayed = data.getUser.mostPlayed;

    return (
        <div className='Main-container'>
            <div className='user-profile-container'>
                <h1>User Profile</h1>
                <p>{user.name}</p>
                <p>{user.country}</p>
                <p>{mostPlayed.name}</p>
                <p>{mostPlayed.artistName}</p>
            </div>
        </div>
    );
};

export default UserProfile;
