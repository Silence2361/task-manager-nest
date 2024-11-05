import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/third-party/jwt/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponceDto } from './dto/create-user-response.dto';
import { GetUsersResponseDto } from './dto/get-users-response.dto';
import { GetUserByIdResponseDto } from './dto/get-user-by-id-response.dto';
import { UpdateUserByIdDto } from './dto/update-user-by-id.dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 409, description: 'Email already registered.' })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponceDto> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'All users returned successfully.',
  })
  async getUsers(): Promise<GetUsersResponseDto[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User returned successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserById(@Param('id') id: number): Promise<GetUserByIdResponseDto> {
    return this.usersService.getUserById({ id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserByIdDto,
  ): Promise<void> {
    await this.usersService.updateUserById(id, updateUserDto);
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archive a user' })
  @ApiResponse({ status: 200, description: 'User archived successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async archiveUserById(@Param('id') id: number): Promise<void> {
    await this.usersService.archiveUserById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUserById(@Param('id') id: number): Promise<void> {
    await this.usersService.deleteUserById({ id });
  }
}
