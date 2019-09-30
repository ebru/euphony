import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} from 'graphql';

import User from '../models/user';
import Song from '../models/song';

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        sid: { type: GraphQLString },
        name: { type: GraphQLString },
        country: { type: GraphQLString },
        profileImage: { type: GraphQLString },
        profileUrl: { type: GraphQLString },
        mostPlayedSid: { type: GraphQLString },
        mostPlayed: {
            type: SongType,
            resolve(parent, args) {
                return Song.findOne({ sid: parent.mostPlayedSid });
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
            resolve(parent, args) {
                return User.find({ mostPlayedSid: parent.sid });
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
            resolve(parent, args) {
                return User.findOne({ sid: args.sid });
            }
        },
        song: {
            type: SongType,
            args: { sid: { type: GraphQLString } },
            resolve(parent, args) {
                return Song.findOne({ sid: args.sid });
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        },
        songs: {
            type: new GraphQLList(SongType),
            resolve(parent, args) {
                return Song.find({});
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
                sid: { type: GraphQLString },
                name: { type: GraphQLString },
                country: { type: GraphQLString },
                profileImage: { type: GraphQLString },
                profileUrl: { type: GraphQLString },
                mostPlayedSid: { type: GraphQLString }
            },
            resolve(parent, args) {
                let user = new User({
                    sid: args.sid,
                    name: args.name,
                    country: args.country,
                    profileImage: args.profileImage,
                    profileUrl: args.profileUrl,
                    mostPlayedSid: args.mostPlayedSid
                });

                return user.save();
            }
        },
        addSong: {
            type: SongType,
            args: {
                sid: { type: GraphQLString },
                name: { type: GraphQLString },
                artistName: { type: GraphQLString },
                previewUrl: { type: GraphQLString },
                coverImage: { type: GraphQLString }
            },
            resolve(parent, args) {
                let song = new Song({
                    sid: args.sid,
                    name: args.name,
                    artistName: args.artistName,
                    previewUrl: args.previewUrl,
                    coverImage: args.coverImage
                });

                return song.save();
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

export default schema;