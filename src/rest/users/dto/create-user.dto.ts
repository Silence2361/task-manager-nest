import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/database/users/users.model';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Alex', description: 'The name of the user' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  // @MinLength(6)
  // @MaxLength(25)
  password: string;

  @ApiProperty({
    example: UserRole.EMPLOYEE,
    description: 'The role of the user',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  @IsString()
  @IsNotEmpty()
  role: UserRole;
}
