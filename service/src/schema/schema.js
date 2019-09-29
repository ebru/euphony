import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Query {
        user(id: String!): User,
        users: [User],
        song(id: String!): Song
    },
    type User {
        id: String,
        name: String,
        country: String,
        profileImage: String,
        profileUrl: String
    },
    type Song {
        id: String,
        name: String,
        artistName: String,
        previewUrl: String,
        coverImage: String
    }
`);

export default schema;