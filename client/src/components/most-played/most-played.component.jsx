import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Spinner from './../spinner/spinner.component';

import './most-played.styles.scss';

const GET_CURRENT_USER_ID = gql`
  {
    currentUserId @client
  }
`;

const GET_MOST_PLAYED = gql`
    query getUser($userId: ID!) {
        getUser(userId: $userId) {
            mostPlayed {
                name
                artistName
            }
        }
    }
`;

const MostPlayed = () => {
    const { currentUserId } = useQuery(GET_CURRENT_USER_ID).data;

    const { data, loading, error } = useQuery(
        GET_MOST_PLAYED,
        { variables: { userId: currentUserId } }
    );

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error.message}</p>;

    const { name, artistName } = data.getUser.mostPlayed;

    return (
        <div className='most-played-container'>
            <p><em>most played so far</em></p>
            <h1>{name}</h1>
            <p><em>by {artistName}</em></p>
        </div>
    );
};

export default MostPlayed;