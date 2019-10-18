import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import MostPlayed from './MostPlayed';
import Spinner from './../Spinner/Spinner';

const GET_MOST_PLAYED = gql`
    query user($sid: String!) {
        user(sid: $sid) {
            mostPlayed {
                name
                artistName
            }
        }
    }
`;

const getCurrentUserId = () => {
    const accessToken = Cookies.get('accessToken');
    const { sid } = jwtDecode(accessToken);

    return sid;
};

const MostPlayedContainer = () => (
    <Query
        query={GET_MOST_PLAYED}
        variables={{ sid: getCurrentUserId() }}>
        {
            ({ loading, data }) => {
                if (loading) return <Spinner />;

                return <MostPlayed mostPlayed={data.user.mostPlayed} />
            }
        }
    </Query>
);

export default MostPlayedContainer;