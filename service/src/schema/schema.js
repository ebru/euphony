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
        mostPlayed: {
            type: SongType,
            resolve(parent, args) {
                return songsData.find(song => song.sid == parent.mostPlayedId);
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
                return usersData.filter(user => user.mostPlayedSid == parent.sid);
            }
        }
    })
});

const usersData = [
    {
        sid: 'user1',
        name: 'Lorem Ipsum',
        country: 'li',
        profileImage: 'https://test.com/img/1',
        profileUrl: 'https://test.com/user/1',
        mostPlayedSid: 'song1'
    },
    {
        sid: 'user2',
        name: 'Dolor Sit',
        country: 'ds',
        profileImage: 'https://test.com/img/2',
        profileUrl: 'https://test.com/user/2',
        mostPlayedSid: 'song1'
    }
];

const songsData = [
    {
        sid: 'song1',
        name: 'Test Test',
        artistName: 'Test One',
        previewUrl: null,
        coverImage: 'https://test.com/image/cover1'
    },
    {
        sid: 'song2',
        name: 'Dolor Dolor',
        artistName: 'Test Two',
        previewUrl: 'https://test.com/song/2',
        coverImage: 'https://test.com/image/cover2'
    }
];

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { sid: { type: GraphQLString } },
            resolve(parent, args) {
                return usersData.find(user => user.sid == args.sid);
            }
        },
        song: {
            type: SongType,
            args: { sid: { type: GraphQLString } },
            resolve(parent, args) {
                return songsData.find(song => song.sid == args.sid);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return usersData;
            }
        },
        songs: {
            type: new GraphQLList(SongType),
            resolve(parent, args) {
                return songsData;
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery
});

export default schema;