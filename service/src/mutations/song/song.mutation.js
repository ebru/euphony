import { GraphQLString, GraphQLNonNull } from 'graphql';

import songType from './../../types/song.type';
import songRepository from './../../repositories/song.repository';

const songMutation = {
    upsertSong: {
        type: songType,
        args: {
            sid: { type: new GraphQLNonNull(GraphQLString) },
            name: { type: GraphQLString },
            artistName: { type: GraphQLString },
            previewUrl: { type: GraphQLString },
            coverImage: { type: GraphQLString }
        },
        resolve(parent, args) {
            const songToUpsert = {
                sid: args.sid,
                name: args.name,
                artistName: args.artistName,
                previewUrl: args.previewUrl,
                coverImage: args.coverImage
            };

            return songRepository.upsertSong(songToUpsert);
        }
    }
};

export default songMutation;