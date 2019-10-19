import { GraphQLString, GraphQLNonNull } from 'graphql';

import songType from './../../types/song.type';
import songRepository from './../../repositories/song.repository';

const songMutation = {
    addSong: {
        type: songType,
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

            return songRepository.addSong(songToAdd);
        }
    }
};

export default songMutation;