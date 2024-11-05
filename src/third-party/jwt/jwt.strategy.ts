import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from 'src/database/users/users.repository';
import { IValidatedUser, JwtPayload } from './payload/jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<IValidatedUser> {
    const user = await this.usersRepository.getUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: user.id, roleId: user.roleId };
  }
}
