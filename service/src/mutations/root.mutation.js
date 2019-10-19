import { GraphQLObjectType } from 'graphql';

import userMutation from './user/user.mutation';
import songMutation from './song/song.mutation';

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...userMutation,
        ...songMutation
    }
});