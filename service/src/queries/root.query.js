import { GraphQLObjectType } from 'graphql';

import userQuery from './user/user.query';
import songQuery from './song/song.query';

export default new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...userQuery,
        ...songQuery
    }
});