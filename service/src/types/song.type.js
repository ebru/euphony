import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
} from 'graphql';

import userType from './user.type';
import userRepository from './../repositories/user.repository';

const songType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
        _id: { type: GraphQLID },
        sid: { type: GraphQLString },
        name: { type: GraphQLString },
        artistName: { type: GraphQLString },
        previewUrl: { type: GraphQLString },
        coverImage: { type: GraphQLString },
        users: {
            type: new GraphQLList(userType),
            resolve({ _id }, args) {
                return userRepository.getUsersByMostPlayedId(_id);
            }
        }
    })
});

export default songType;