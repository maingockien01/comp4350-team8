import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {UserCourseService} from './user.course.service';
import {UserDTO} from '@team8/types/dtos/user/user.dto';
import {SectionDTO} from '@team8/types/dtos/section/section.dto';
import {JWTAuthGuard} from '../auth/jwt-auth.guard';

@Controller()
/**
 * Controller class for managing user courses.
 */
export class UserCourseController {
  /**
   * Creates an instance of UserCourseController.
   * @param {UserCourseService} userService - The user course service.
   */
  constructor(readonly userService: UserCourseService) {}

  /**
   * Retrieves all user courses.
   * @return {Promise<UserDTO[]>}
   */
  @Get()
  async findAll(): Promise<UserDTO[]> {
    return this.userService.findAll();
  }

  /**
   * Retrieves a specific user course based on the user's JWT token.
   * @param {Request} req - The request object containing the user's JWT token.
   * @return {Promise<UserDTO>} A promise that resolves to a UserDTO object.
   */
  @UseGuards(JWTAuthGuard)
  @Get('search')
  async findOne(@Request() req): Promise<UserDTO> {
    return this.userService.find(req.user.uid);
  }

  /**
   * Retrieves sections for a specific user course
   * based on the user's JWT token and a given tid.
   * @param {number} tid - The tid (section ID) to search for.
   * @param {Request} req - The request object containing the user's JWT token.
   * @return {Promise<SectionDTO[]>}
   */
  @UseGuards(JWTAuthGuard)
  @Get('searchSection')
  async findSection(
    @Query('tid') tid: number,
    @Request() req,
  ): Promise<SectionDTO[]> {
    return this.userService.findSection(req.user.uid, tid);
  }

  /**
   * Retrieves active sections for a specific user course
   * based on the user's JWT token and a given tid.
   * @param {number} tid - The tid (section ID) to search for.
   * @param {Request} req - The request object containing the user's JWT token.
   * @return {Promise<SectionDTO[]>}
   */
  @UseGuards(JWTAuthGuard)
  @Get('searchActive')
  async findActive(
    @Query('tid') tid: number,
    @Request() req,
  ): Promise<SectionDTO[]> {
    return this.userService.findActive(req.user.uid, tid);
  }

  /**
   * Adds a user to a section based on the user's JWT token and a given sid.
   * @param {number} sid - The sid (section ID) to add the user to.
   * @param {Request} req - The request object containing the user's JWT token.
   * @return {Promise<void>} A promise that resolves to void.
   */
  @UseGuards(JWTAuthGuard)
  @Get('add')
  /**
   * Adds a user with a section based on the user's JWT token and a given sid.
   * @param {number} sid - The sid (section ID) to add the user to.
   * @param {Request} req - The request object containing the user's JWT token.
   * @return {Promise<void>} A promise that resolves to void.
   */
  async addUserWithSection(
    @Query('sid') sid: number,
    @Request() req,
  ): Promise<void> {
    await this.userService.registerSection(req.user.uid, sid);
  }

  /**
   * Removes a user from a section
   * based on the user's JWT token and a given sid.
   * @param {number} sid - The sid (section ID) to remove the user from.
   * @param {Request} req - The request object containing the user's JWT token.
   * @return {Promise<void>} A promise that resolves to void.
   */
  @UseGuards(JWTAuthGuard)
  @Get('remove')
  async removeUserFromSection(
    @Query('sid') sid: number,
    @Request() req,
  ): Promise<void> {
    await this.userService.deleteUserFromSection(sid, req.user.uid);
  }

  /**
   * Adds a done section for a specific user course.
   * @param {number} uid - The uid (user ID) to add the done section to.
   * @param {number} sid - The sid (section ID) to mark as done.
   * @return {Promise<void>} A promise that resolves to void.
   */
  @Get('done')
  /**
   * Adds a done section for a specific user course.
   * @param {number} uid - The uid (user ID) to add the done section to.
   * @param {number} sid - The sid (section ID) to mark as done.
   * @return {Promise<void>} A promise that resolves to void.
   */
  async addDoneSection(
    @Query('uid') uid: number,
    @Query('sid') sid: number,
  ): Promise<void> {
    await this.userService.addDoneCourse(uid, sid);
  }
}
