import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import MostPlayed from './MostPlayed';
import Spinner from './../Spinner/Spinner';

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

const getCurrentUserId = () => {
    return localStorage.getItem('currentUserId');
};

const MostPlayedContainer = () => (
    <Query
        query={GET_MOST_PLAYED}
        variables={{ userId: getCurrentUserId() }}>
        {
            ({ loading, data }) => {
                if (loading) return <Spinner />;

                const { mostPlayed } = data.getUser;
                return <MostPlayed mostPlayed={mostPlayed} />
            }
        }
    </Query>
);

export default MostPlayedContainer;