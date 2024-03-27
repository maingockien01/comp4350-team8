import {Body, Controller, Post, UseGuards, Request, Get} from '@nestjs/common';
import {ProfileService} from './profile.service';
import {UpdateUserDto} from '@team8/types/dtos/profile/update.dto';
import {JWTAuthGuard} from '../auth/jwt-auth.guard';

@Controller()
/**
 * Controller class for managing the user profile.
 */
export class ProfileController {
  /**
   * Creates an instance of the ProfileController.
   * @param {ProfileService} profileService
   */
  constructor(private profileService: ProfileService) {}

  /**
   * Updates the user profile.
   * @param {UpdateUserDto} updateDto - The user profile data.
   * @param {Request} req
   * @return {Promise<any>}
   */
  @UseGuards(JWTAuthGuard)
  @Post()
  update(@Body() updateDto: UpdateUserDto, @Request() req) {
    return this.profileService.updateUserInfo(req.user.uid, updateDto);
  }

  /**
   * Retrieves the user profile.
   * @param {Request} req
   * @return {Promise<any>}
   */
  @UseGuards(JWTAuthGuard)
  @Get()
  getUserProfile(@Request() req) {
    return this.profileService.getUserProfile(req.user.uid);
  }
}
