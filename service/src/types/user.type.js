import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} from 'graphql';

import songType from './song.type';
import songRepository from './../repositories/song.repository';

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLID },
        sid: { type: GraphQLString },
        name: { type: GraphQLString },
        country: { type: GraphQLString },
        profileImage: { type: GraphQLString },
        profileUrl: { type: GraphQLString },
        mostPlayed: {
            type: songType,
            resolve({ mostPlayedSid }, args) {
                return songRepository.getSong(mostPlayedSid);
            }
        }
    })
});

export default userType;