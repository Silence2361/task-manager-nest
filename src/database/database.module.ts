import { Global, Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { User } from './users/users.model';
import { UsersRepository } from './users/users.repository';
import { Project } from './projects/projects.model';
import { ProjectsRepository } from './projects/repositories/projects.repository';
import { ProjectUsersRepository } from './projects/repositories/project-users.repository';
import { Task } from './tasks/tasks.model';
import { TasksRepository } from './tasks/tasks.repository';
import { Role } from './roles/roles.model';
import { RolesRepository } from './roles/roles.repository';

@Global()
@Module({
  imports: [ObjectionModule.forFeature([User, Project, Task, Role])],
  providers: [
    UsersRepository,
    ProjectsRepository,
    ProjectUsersRepository,
    TasksRepository,
    RolesRepository,
  ],
  exports: [
    UsersRepository,
    ProjectsRepository,
    ProjectUsersRepository,
    TasksRepository,
    RolesRepository,
  ],
})
export class DatabaseModule {}
