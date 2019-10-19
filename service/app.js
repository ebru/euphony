import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './src/routes';
import schema from './src/schema';

const DB_CONNECT_URL = process.env.DB_CONNECT_URL;
const APP_PORT = 5000;

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

app.use('/api/graphql',
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === 'development' // Disable graphiql on production
    })
);

app.listen(
    APP_PORT,
    () => console.log(`Listening on ${APP_PORT}`)
);
