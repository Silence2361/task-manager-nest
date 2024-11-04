import { Global, Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { User } from './users/users.model';
import { UsersRepository } from './users/users.repository';
import { Project } from './projects/projects.model';
import { ProjectsRepository } from './projects/repositories/projects.repository';
import { ProjectUsersRepository } from './projects/repositories/project-users.repository';
// import { Task } from './tasks/tasks.model';
// import { TasksRepository } from './tasks/tasks.repository';

@Global()
@Module({
  imports: [ObjectionModule.forFeature([User, Project])],
  providers: [UsersRepository, ProjectsRepository, ProjectUsersRepository],
  exports: [UsersRepository, ProjectsRepository, ProjectUsersRepository],
})
export class DatabaseModule {}
