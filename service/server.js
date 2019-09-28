import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';

import routes from './src/routes/routes';
import schema from './src/graphql/schema';

const app = express();

// Use cookie parser
app.use(cookieParser());

// Use body parser
app.use(bodyParser.json());

// Use cors
app.use(cors());

// Use routes
app.use('/api', routes);

const root = {
    hello: () => 'Hello!!'
};

app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(8888, () => console.log('Listening on 8888'));
