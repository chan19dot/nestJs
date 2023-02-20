import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'nestdb',
      password: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ], //-> all other modules this module might import
  controllers: [AppController], //-> List is specified in the implementation.
  providers: [AppService], //service layer
})
export class AppModule {}
