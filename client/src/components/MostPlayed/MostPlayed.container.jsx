import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Cookies from 'js-cookie';

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

const MostPlayedContainer = () => (
    <Query
        query={GET_MOST_PLAYED}
        variables={{ sid: Cookies.get('currentUserSid') }}>
        {
            ({ loading, data }) => {
                if (loading) return <Spinner />;

                return <MostPlayed mostPlayed={data.user.mostPlayed} />
            }
        }
    </Query>
);

export default MostPlayedContainer;