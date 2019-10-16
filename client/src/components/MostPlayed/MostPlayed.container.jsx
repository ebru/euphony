import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import MostPlayed from './MostPlayed';
import Spinner from './../Spinner/Spinner';

const GET_MOST_PLAYED = gql`
    {
        user(sid: "st943c9lgd92wk98aw3bfxcvb") {
            mostPlayed {
                name
                artistName
            }
        }
    }
`;

const MostPlayedContainer = () => (
    <Query query={GET_MOST_PLAYED}>
        {
            ({ loading, data }) => {
                if (loading) return <Spinner />;

                return <MostPlayed mostPlayed={data.user.mostPlayed} />
            }
        }
    </Query>
);

export default MostPlayedContainer;