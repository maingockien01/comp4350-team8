import {Injectable, ForbiddenException} from '@nestjs/common';
import {Repository, QueryFailedError} from 'typeorm';
import {User} from '../entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {UpdateUserDto} from '@team8/types/dtos/profile/update.dto';
import {CreateUserDto} from '../auth/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
/**
 * Service responsible for managing user operations.
 */
export class UsersService {
  /**
  * Creates an instance of UsersService.
  * @param {Repository<User>} usersRepository
  * The repository for user entities.
  */
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user.
   * @param {CreateUserDto} dto
   * The CreateUserDto object containing the user information.
   * @return {Promise<User>}
   * The created user object.
   * @throws {ForbiddenException}
   * if the username is already taken.
   */
  async create(dto: CreateUserDto): Promise<User> {
    try {
      await this.usersRepository.save(dto);
      return await this.findOneByUsername(dto.username);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.driverError.code === 'ER_DUP_ENTRY') {
          throw new ForbiddenException('Credential taken');
        }
      }
    }
  }

  /**
   * Updates the user information.
   * @param {number} uid
   * The ID of the user to update.
   * @param {UpdateUserDto} dto
   * The UpdateUserDto object containing the updated user information.
   * @return {Promise<User>}
   * The updated user object.
   * @throws {ForbiddenException}
   * if the user is not found or if the username is already taken.
   */
  async updateUserInfo(uid: number, dto: UpdateUserDto): Promise<User> {
    try {
      const saltOrRounds = 10;
      const user = await this.findOneById(uid);
      if (user) {
        if (dto.username !== '') user.username = dto.username;
        if (dto.fullName !== '') user.fullName = dto.fullName;
        if (dto.password !== '') {
          user.hashPassword = await bcrypt.hash(dto.password, saltOrRounds);
        }
        await this.usersRepository.save(user);
        return user;
      } else {
        throw new ForbiddenException('User not found!');
      }
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.driverError.code === 'ER_DUP_ENTRY') {
          throw new ForbiddenException('Username is already taken!');
        }
      }
    }
  }

  /**
   * Finds a user by their username.
   * @param {string} username
   * The username of the user to find.
   * @return {Promise<User | undefined>}
   * A Promise that resolves to the user object if found,
   * or undefined if not found.
   */
  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({username});
  }

  /**
   * Finds a user by their ID.
   * @param {number} uid
   * The ID of the user to find.
   * @return {Promise<User | undefined>}
   * A Promise that resolves to the user object if found,
   * or undefined if not found.
   */
  async findOneById(uid: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({uid});
  }
}
