import { GraphQLID } from 'graphql';

import userType from './../../types/user.type';
import userRepository from './../../repositories/user.repository';

const userQuery = {
    user: {
        type: userType,
        args: { _id: { type: GraphQLID } },
        resolve(parent, { _id }) {
            return userRepository.getUser(_id);
        }
    }
};

export default userQuery;