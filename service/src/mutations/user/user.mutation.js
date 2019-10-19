import { GraphQLString, GraphQLNonNull } from 'graphql';

import userType from './../../types/user.type';
import userRepository from './../../repositories/user.repository';

const userMutation = {
    upsertUser: {
        type: userType,
        args: {
            sid: { type: new GraphQLNonNull(GraphQLString) },
            name: { type: GraphQLString },
            country: { type: GraphQLString },
            profileImage: { type: GraphQLString },
            profileUrl: { type: GraphQLString },
            mostPlayedSid: { type: GraphQLString }
        },
        resolve(parent, args) {
            const userToUpsert = {
                sid: args.sid,
                name: args.name,
                country: args.country,
                profileImage: args.profileImage,
                profileUrl: args.profileUrl,
                mostPlayedSid: args.mostPlayedSid
            };

            return userRepository.upsertUser(userToUpsert);
        }
    }
};

export default userMutation;