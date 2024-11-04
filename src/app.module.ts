import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from 'nestjs-objection';
import Knex from 'knex';
import { Model } from 'objection';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './rest/users/users.module';
import { ProjectsController } from './rest/projects/projects.controller';
import { ProjectsService } from './rest/projects/projects.service';
import { ProjectsModule } from './rest/projects/projects.module';
import { AuthModule } from './rest/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    ObjectionModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const knexConfig = {
          client: 'pg',
          connection: {
            host: configService.get<string>('DATABASE_HOST'),
            port: configService.get<number>('DATABASE_PORT'),
            user: configService.get<string>('DATABASE_USERNAME'),
            password: configService.get<string>('DATABASE_PASSWORD'),
            database: configService.get<string>('DATABASE_NAME'),
          },
        };

        const knex = Knex(knexConfig);

        Model.knex(knex);

        return { config: knexConfig };
      },
      inject: [ConfigService],
    }),
    DatabaseModule,
    UsersModule,
    ProjectsModule,
    AuthModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class AppModule {}
