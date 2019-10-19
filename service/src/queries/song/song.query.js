import { GraphQLString, GraphQLList } from 'graphql';

import songType from './../../types/song.type';
import songRepository from './../../repositories/song.repository';

const songQuery = {
    song: {
        type: songType,
        args: { sid: { type: GraphQLString } },
        resolve(parent, { sid }) {
            return songRepository.getSong(sid);
        }
    },
    songs: {
        type: new GraphQLList(songType),
        resolve(parent, args) {
            return songRepository.getSongs();
        }
    }
};

export default songQuery;