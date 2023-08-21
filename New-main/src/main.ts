import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
// somewhere in your initialization file
const port = process.env.PORT || 3000;
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.enableCors();
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin (replace * with the specific origin if needed)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the HTTP methods used in your request
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow the necessary headers
    next();
  }); // Add this line
  await app.listen(port);
}
bootstrap();
