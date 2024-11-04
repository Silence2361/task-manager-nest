import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { User } from 'src/database/users/users.model';

@Module({
  imports: [],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
