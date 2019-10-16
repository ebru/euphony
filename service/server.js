import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './src/routes/routes';
import schema from './src/schema/schema';

const app = express();

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

// Use graphql
app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    // Disable graphiql on production
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

app.listen(5000, () => console.log('Listening on 5000'));
