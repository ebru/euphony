import { GraphQLID } from 'graphql';

import songType from './../../types/song.type';
import songRepository from './../../repositories/song.repository';

const songQuery = {
    song: {
        type: songType,
        args: { _id: { type: GraphQLID } },
        resolve(parent, { _id }) {
            return songRepository.getSong(_id);
        }
    }
};

export default songQuery;