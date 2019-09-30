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
mongoose.connection.once('open', () => {
    console.log('Connected to database.');
});

// Use graphql
app.use('/api/graphql', graphqlHTTP({
    schema: schema,
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
