import { Module } from '@nestjs/common';

import { DatabaseModulemosque } from './UserProfile/DatabaseConfig/database.Config';







@Module({

  imports: [DatabaseModulemosque],
  controllers: [],
  providers: [],
})
export class AppModule {}

