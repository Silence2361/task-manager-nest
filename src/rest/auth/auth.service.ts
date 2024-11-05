import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/database/users/users.repository';
import {
  ILogin,
  ILoginResponse,
  IRegister,
  IRegisterResponse,
} from 'src/database/auth/auth.interface';
import { IUser } from 'src/database/users/users.interface';
import { ConfigService } from '@nestjs/config';
import { RolesRepository } from 'src/database/roles/roles.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRespository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async register(credentials: IRegister): Promise<IRegisterResponse> {
    const { name, email, password, roleName } = credentials;

    const candidate = await this.usersRespository.getUserByEmail(email);

    if (candidate) {
      throw new ConflictException(`This email ${email} already registered`);
    }

    const role = await this.rolesRepository.findRoleByName(roleName);
    if (!role) {
      throw new NotFoundException(`Role ${roleName} not found`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await this.usersRespository.createUser({
      name,
      email,
      password: hashedPassword,
      roleId: role.id,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
    };
  }

  async login(credentials: ILogin): Promise<ILoginResponse> {
    const { email, password } = credentials;

    const user = await this.usersRespository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not fount');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong Password');
    }

    const payload = { id: user.id };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
    });

    return { accessToken };
  }
}
