import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './src/routes/routes';
import expressGraphQL from 'express-graphql';
import schema from './src/graphql/schema';

const app = express();

app.use(cookieParser());
app.use('/api', routes);

const root = { hello: () => 'Hello!!' };

app.use('/api', expressGraphQL({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

console.log('Listening on 8888');
app.listen(8888);