import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Query {
        user(sid: String!): User
    },
    type User {
        sid: String,
        name: String,
        country: String,
        profileImage: String,
        profileUrl: String
    }
`);

export default schema;