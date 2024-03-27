import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {UpdateUserDto} from '@team8/types/dtos/profile/update.dto';

@Injectable()
/**
 * The ProfileService class is a service provider for the Profile entity.
 */
export class ProfileService {
  /**
   * Creates an instance of the ProfileService class.
   * @param {UsersService} usersService
   */
  constructor(private usersService: UsersService) {}

  /**
   * Updates the user profile.
   * @param {number} uid - The ID of the user.
   * @param {UpdateUserDto} dto - The user profile data.
   * @return {Promise<any>}
   */
  async updateUserInfo(uid: number, dto: UpdateUserDto): Promise<any> {
    try {
      await this.usersService.updateUserInfo(uid, dto);
      return {
        message: 'Updated user profile successfully',
        status: 'success',
      };
    } catch (error) {
      return {
        message: error.message,
        status: 'fail',
      };
    }
  }

  /**
   * Retrieves the user profile.
   * @param {number} uid - The ID of the user.
   * @return {Promise<any>}
   */
  async getUserProfile(uid: number) {
    const user = await this.usersService.findOneById(uid);
    if (!user) {
      return {
        message: 'User not found!',
        status: 'fail',
      };
    } else {
      return {
        message: 'Found an user!',
        status: 'success',
        user: user,
      };
    }
  }
}
