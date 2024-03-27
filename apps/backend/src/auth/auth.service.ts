import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {LogInDto, SignUpDto} from '@team8/types/dtos/auth';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from './createUser.dto';
import {User} from '../entities/user.entity';
import {JwtService} from '@nestjs/jwt';
import {Response} from 'express';
import {ReturnDto} from 'packages/types/dtos/auth/Return.dto';

@Injectable()
/**
 * The AuthService class is a service provider for the Auth entity.
 */
export class AuthService {
  /**
   * Creates an instance of the AuthService class.
   * @param {UsersService} usersService
   * @param {JwtService} jwtService
   */
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Signs up a new user.
   * @param {SignUpDto} dto - The user data.
   * @return {Promise<ReturnDto>}
   */
  async signUp(dto: SignUpDto): Promise<ReturnDto> {
    const saltOrRounds = 10;
    const userDto = new CreateUserDto(dto);
    userDto.hashPassword = await bcrypt.hash(dto.password, saltOrRounds);
    try {
      await this.usersService.create(userDto);
      return {
        status: 'success',
        message: 'New user created!',
      };
    } catch (error) {
      return {
        status: 'fail',
        message: error.message,
      };
    }
  }

  /**
   * Logs in a user.
   * @param {LogInDto} dto - The user data.
   * @param {Response} response
   * @return {Promise<ReturnDto>}
   */
  async logIn(dto: LogInDto, response: Response): Promise<ReturnDto> {
    try {
      const user = await this.usersService.findOneByUsername(dto.username);
      if (user) {
        if (await bcrypt.compare(dto.password, user.hashPassword)) {
          const payload = {username: user.username, sub: user.uid};
          response.cookie('access_token', this.jwtService.sign(payload));
          return {
            status: 'success',
            message: 'Login successfully!',
          };
        }
      }
      return {
        status: 'fail',
        message: 'Incorrect username or password!',
      };
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Logs out a user.
   * @param {User} user
   * @return {string} token
   */
  generateToken(user: User): string {
    const payload = {username: user.username, sub: user.uid};
    return this.jwtService.sign(payload);
  }
}
