import { Global, Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { User } from './users/users.model';
import { UsersRepository } from './users/users.repository';
import { Project } from './projects/projects.model';
import { ProjectsRepository } from './projects/projects.repository';
import { Task } from './tasks/tasks.model';
import { TasksRepository } from './tasks/tasks.repository';

@Global()
@Module({
  imports: [ObjectionModule.forFeature([User, Project, Task])],
  providers: [UsersRepository, ProjectsRepository, TasksRepository],
  exports: [UsersRepository, ProjectsRepository, TasksRepository],
})
export class DatabaseModule {}
