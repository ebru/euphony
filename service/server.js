import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';

import routes from './src/routes/routes';
import schema from './src/schema/schema';

const app = express();

// Use cookie parser
app.use(cookieParser());

// Use body parser
app.use(bodyParser.json());

// Use cors
app.use(cors());

// Use routes
app.use('/api', routes);

const usersData = [
    {
        id: 'test123',
        name: 'Lorem Ipsum',
        country: 'li',
        profileImage: 'https://test.com/img/1',
        profileUrl: 'https://test.com/user/1',
        mostPlayedId: 'test123'
    },
    {
        id: 'test456',
        name: 'Dolor Sit',
        country: 'ds',
        profileImage: 'https://test.com/img/2',
        profileUrl: 'https://test.com/user/2',
        mostPlayedId: 'test456'
    }
];

const songsData = [
    {
        id: 'test123',
        name: 'Test Test',
        artistName: 'Test One',
        previewUrl: null,
        coverImage: 'https://test.com/image/cover1'
    },
    {
        id: 'test456',
        name: 'Dolor Dolor',
        artistName: 'Test Two',
        previewUrl: 'https://test.com/song/2',
        coverImage: 'https://test.com/image/cover2'
    }
];

const getUser = ({ id }) => {
    return usersData.find(user => user.id == id);
};

const getSong = ({ id }) => {
    return songsData.find(song => song.id == id);
};

const root = {
    user: getUser,
    song: getSong
};

app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(8888, () => console.log('Listening on 8888'));
