import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './src/routes/routes';
import schema from './src/schema/schema';

const app = express();

// Connect to db
mongoose.connect('mongodb://db:27017/euphony', { useNewUrlParser: true });

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

const getUsers = () => {
    return usersData;
};

const getSong = ({ id }) => {
    return songsData.find(song => song.id == id);
};

const getSongs = () => {
    return songsData;
};

const root = {
    user: getUser,
    users: getUsers,
    song: getSong,
    songs: getSongs
};

app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

// Use routes
app.use('/api', routes);

// Use cookie parser
app.use(cookieParser());

// Use body parser
app.use(bodyParser.json());

// Use cors
app.use(cors());

app.listen(8888, () => console.log('Listening on 8888'));
