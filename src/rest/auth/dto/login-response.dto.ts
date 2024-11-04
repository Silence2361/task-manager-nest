import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ example: 'jwt_token', description: 'JWT Access Token' })
  accessToken: string;
}
