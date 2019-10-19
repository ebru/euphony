import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import MostPlayed from './MostPlayed';
import Spinner from './../Spinner/Spinner';

const GET_MOST_PLAYED = gql`
    query user($_id: ID!) {
        user(_id: $_id) {
            mostPlayed {
                name
                artistName
            }
        }
    }
`;

const getCurrentUserId = () => {
    const accessToken = Cookies.get('accessToken');
    const { userId } = jwtDecode(accessToken);

    return userId;
};

const MostPlayedContainer = () => (
    <Query
        query={GET_MOST_PLAYED}
        variables={{ _id: getCurrentUserId() }}>
        {
            ({ loading, data }) => {
                if (loading) return <Spinner />;

                return <MostPlayed mostPlayed={data.user.mostPlayed} />
            }
        }
    </Query>
);

export default MostPlayedContainer;