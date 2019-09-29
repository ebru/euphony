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
        sid: 'test123',
        name: 'Lorem Ipsum',
        country: 'li',
        profileImage: 'https://test.com/img/1',
        profileUrl: 'https://test.com/user/1'
    },
    {
        sid: 'test456',
        name: 'Dolor Sit',
        country: 'ds',
        profileImage: 'https://test.com/img/2',
        profileUrl: 'https://test.com/user/2'
    }
];

const getUser = args => {
    return usersData.find(user => user.sid == args.sid);
};

const root = {
    user: getUser,
};

app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(8888, () => console.log('Listening on 8888'));
