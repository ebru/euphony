import UserResolver from './user/user.resolver';
import SongResolver from './song/song.resolver';

const resolvers = {
    ...UserResolver,
    ...SongResolver
};

export default resolvers;