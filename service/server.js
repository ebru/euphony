import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './src/routes';
import schema from './src/schema';

// Db connection config
const DB_CONNECT_URL = process.env.DB_CONNECT_URL;

// Connect to db
mongoose.connect(
    DB_CONNECT_URL,
    { useNewUrlParser: true, useFindAndModify: false }
);

mongoose.connection.once('open', () => {
    console.log('Connected to database.');
});

const app = express();

app.use('/api', routes);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.use('/api/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development' // Disable graphiql on production
}));

app.listen(5000, () => console.log('Listening on 5000'));
