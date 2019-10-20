import { GraphQLID } from 'graphql';

import songType from './../../types/song.type';
import songRepository from './../../repositories/song.repository';

const songQuery = {
    getSong: {
        type: songType,
        args: { songId: { type: GraphQLID } },
        resolve(parent, { songId }) {
            return songRepository.getSong(songId);
        }
    }
};

export default songQuery;