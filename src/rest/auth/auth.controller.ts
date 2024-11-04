import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterResponseDto } from './dto/register-response.dto';
import { AuthDto } from './dto/auth.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('auth')
@Controller('auth')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registration of new user' })
  @ApiOkResponse({ type: RegisterResponseDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: AuthDto): Promise<RegisterResponseDto> {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiResponse({ status: 200, description: 'Successfully logged in.' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDto): Promise<LoginResponseDto> {
    return this.authService.login(dto);
  }
}
