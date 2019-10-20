import { GraphQLID } from 'graphql';

import userType from './../../types/user.type';
import userRepository from './../../repositories/user.repository';

const userQuery = {
    getUser: {
        type: userType,
        args: { userId: { type: GraphQLID } },
        resolve(parent, { userId }) {
            return userRepository.getUser(userId);
        }
    }
};

export default userQuery;