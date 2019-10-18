import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';

import jwt from 'jsonwebtoken';

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

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

const AuthType = new GraphQLObjectType({
    name: 'Auth',
    fields: () => ({
        isAuthed: { type: GraphQLBoolean }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        authenticate: {
            type: AuthType,
            args: { accessToken: { type: GraphQLString } },
            resolve(parent, args) {
                const { accessToken } = args;
                let isAuthed = false;

                jwt.verify(accessToken, JWT_SECRET, function (err, decoded) {
                    if (!err) isAuthed = true;
                });

                return {
                    isAuthed
                }
            }
        },
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
                sid: { type: new GraphQLNonNull(GraphQLString) },
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
                sid: { type: new GraphQLNonNull(GraphQLString) },
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