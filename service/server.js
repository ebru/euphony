import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './src/routes/routes';
import schema from './src/schema/schema';

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
    // Disable graphiql on production
    graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(5000, () => console.log('Listening on 5000'));
