import { GraphQLString, GraphQLList } from 'graphql';

import userType from './../../types/user.type';
import userRepository from './../../repositories/user.repository';

const userQuery = {
    user: {
        type: userType,
        args: { sid: { type: GraphQLString } },
        resolve(parent, { sid }) {
            return userRepository.getUser(sid);
        }
    },
    users: {
        type: new GraphQLList(userType),
        resolve(parent, args) {
            return userRepository.getUsers();
        }
    }
};

export default userQuery;