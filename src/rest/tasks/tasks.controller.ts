import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskResponseDto } from './dto/create-task-response.dto';
import { GetTaskByIdResponseDto } from './dto/get-task-by-id-response.dto';
import { GetTasksResponseDto } from './dto/get-tasks-response.dto';
import { UpdateTaskByIdDto } from './dto/update-task-by-id.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SetDeadlineDto } from './dto/set-deadline.dto';
import { SetDeadlineResponseDto } from './dto/set-deadline-response.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { MoveTaskResponseDto } from './dto/move-task-response.dto';
import { AssignUserToTaskDto } from './dto/assign-user-to-task.dto';
import { AssignUserToTaskResponseDto } from './dto/assign-user-to-task-response.dto';
import { JwtAuthGuard } from 'src/third-party/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/third-party/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new task (Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: CreateTaskResponseDto,
  })
  async createTask(
    @Body() createTask: CreateTaskDto,
  ): Promise<CreateTaskResponseDto> {
    return this.tasksService.createTask(createTask);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks',
    type: [GetTasksResponseDto],
  })
  async getTasks(): Promise<GetTasksResponseDto[]> {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Task details',
    type: GetTaskByIdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async getTaskById(@Param('id') id: number): Promise<GetTaskByIdResponseDto> {
    return this.tasksService.getTaskById({ id });
  }

  @Put(':id')
  @Roles('ADMIN', 'EMPLOYEE')
  @ApiOperation({ summary: 'Update a task by ID (Admin and Employee)' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async updateTaskById(
    @Param('id') id: number,
    @Body() updateTask: UpdateTaskByIdDto,
    @Req() req,
  ): Promise<void> {
    return this.tasksService.updateTaskById(id, updateTask, req.user);
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archive task' })
  @ApiResponse({ status: 200, description: 'Task archived successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async archiveProjectById(@Param('id') id: number): Promise<void> {
    await this.tasksService.archiveTaskById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async deleteTaskById(@Param('id') id: number): Promise<void> {
    return this.tasksService.deleteTaskById({ id });
  }

  @Patch(':id/deadline')
  @ApiOperation({ summary: 'Set deadline for a task' })
  @ApiResponse({
    status: 200,
    description: 'Deadline set successfully',
    type: SetDeadlineResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async setDeadline(
    @Param('id') id: number,
    @Body() setDeadline: SetDeadlineDto,
  ): Promise<SetDeadlineResponseDto> {
    return this.tasksService.deadlineTaskById(id, setDeadline.deadline);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Mark task as completed or not' })
  @ApiResponse({ status: 200, description: 'Task status updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async markTaskAsCompleted(
    @Param('id') id: number,
    @Req() req,
  ): Promise<void> {
    return this.tasksService.markTaskAsCompleted(id, req.user);
  }

  @Patch(':id/project')
  @Roles('EMPLOYEE')
  @ApiOperation({ summary: 'Move task to another project (Employee only)' })
  @ApiResponse({
    status: 200,
    description: 'Task moved to project successfully',
    type: MoveTaskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Project or task not found' })
  async moveTaskToProject(
    @Param('id') taskId: number,
    @Body() moveTaskDto: MoveTaskDto,
  ): Promise<MoveTaskResponseDto> {
    return this.tasksService.moveTaskToProject(taskId, moveTaskDto.projectId);
  }

  @Patch(':id/assign')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Assign a user to the task (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'User assigned to task successfully',
    type: AssignUserToTaskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Task or user not found' })
  async assignUserToTask(
    @Param('id') taskId: number,
    @Body() assignUserToTaskDto: AssignUserToTaskDto,
  ): Promise<AssignUserToTaskResponseDto> {
    return this.tasksService.assignUserToTask(
      taskId,
      assignUserToTaskDto.assigneeId,
    );
  }
}
