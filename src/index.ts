import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from 'config';
import img from './api/img';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';
import nestSubApi from './nestApi/subapp'
import { Application } from 'express-serve-static-core';
import { NestApplication, NestApplicationContext } from '@nestjs/core';
import { NestApiModule } from './nestApi/nestApi.module';

const app = express();

// logger
app.use(morgan('dev'));

app.use('/media', express.static(__dirname + config.get(`${config.get('platform')}.assetPath`)))

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.get('corsHeaders'),
}));

app.use(bodyParser.json({
  limit : config.get('bodyLimit')
}));

// connect to db
initializeDb( db => {
  // internal middleware
  app.use(middleware({ config, db }));

  // api router
  app.use('/api', api({ config, db }));
  app.use('/img', img({ config, db }));

  const port = process.env.PORT || config.get('server.port')
  const host = process.env.HOST || config.get('server.host')
  
  async function mountNestApp (expressApp: Application, mountPath: string, subApp: any) {
    const nestSubApp = await subApp()
    await nestSubApp.init()
  
    expressApp.use(mountPath, nestSubApp.getHttpAdapter().getInstance())
    return expressApp
  }
  
  mountNestApp(app, '/api/v2', nestSubApi).then(app => {
    (app as any).listen(parseInt(port), host, () => {
      console.log(`Vue Storefront API started at http://${host}:${port}`);
    });
  });
});

// graphQl Server part
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/graphql', graphqlExpress(req => ({
  schema,
  context: { req: req },
  rootValue: global
})));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

export default app;
