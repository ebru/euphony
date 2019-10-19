import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';

import resolvers from './../resolvers/resolvers';

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        sid: { type: GraphQLString },
        name: { type: GraphQLString },
        country: { type: GraphQLString },
        profileImage: { type: GraphQLString },
        profileUrl: { type: GraphQLString },
        mostPlayed: {
            type: SongType,
            resolve({ mostPlayedSid }, args) {
                return resolvers.getSong(mostPlayedSid);
            }
        }
    })
});

const SongType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
        id: { type: GraphQLID },
        sid: { type: GraphQLString },
        name: { type: GraphQLString },
        artistName: { type: GraphQLString },
        previewUrl: { type: GraphQLString },
        coverImage: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve({ sid }, args) {
                return resolvers.getUsersByMostPlayedSid(sid);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { sid: { type: GraphQLString } },
            resolve(parent, { sid }) {
                return resolvers.getUser(sid);
            }
        },
        song: {
            type: SongType,
            args: { sid: { type: GraphQLString } },
            resolve(parent, { sid }) {
                return resolvers.getSong(sid);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return resolvers.getUsers();
            }
        },
        songs: {
            type: new GraphQLList(SongType),
            resolve(parent, args) {
                return resolvers.getSongs();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                sid: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                country: { type: GraphQLString },
                profileImage: { type: GraphQLString },
                profileUrl: { type: GraphQLString },
                mostPlayedSid: { type: GraphQLString }
            },
            resolve(parent, args) {
                const userToAdd = {
                    sid: args.sid,
                    name: args.name,
                    country: args.country,
                    profileImage: args.profileImage,
                    profileUrl: args.profileUrl,
                    mostPlayedSid: args.mostPlayedSid
                };

                return resolvers.addUser(userToAdd);
            }
        },
        addSong: {
            type: SongType,
            args: {
                sid: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                artistName: { type: GraphQLString },
                previewUrl: { type: GraphQLString },
                coverImage: { type: GraphQLString }
            },
            resolve(parent, args) {
                const songToAdd = {
                    sid: args.sid,
                    name: args.name,
                    artistName: args.artistName,
                    previewUrl: args.previewUrl,
                    coverImage: args.coverImage
                };

                return resolvers.addSong(songToAdd);
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

export default schema;