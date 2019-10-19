import { GraphQLSchema } from 'graphql';

import rootQuery from './queries/root.query';
// import rootMutation from './mutations/root.mutation';

const schema = new GraphQLSchema({
    query: rootQuery,
    // mutation: rootMutation
});

export default schema;