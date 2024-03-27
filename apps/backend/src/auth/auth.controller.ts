import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Response} from 'express';
import {LogInDto, SignUpDto} from '@team8/types/dtos/auth';
import {ReturnDto} from 'packages/types/dtos/auth/Return.dto';

@Controller()
/**
 * Controller class for managing authentication.
 */
export class AuthController {
  /**
   * Creates an instance of the AuthController.
   * @param {AuthService} authService
   */
  constructor(private authService: AuthService) {}

  /**
   * Signs up a new user.
   * @param {SignUpDto} signupDto - The user data.
   * @return {Promise<ReturnDto>}
   */
  @Post('signup')
  async signUp(@Body() signupDto: SignUpDto): Promise<ReturnDto> {
    return await this.authService.signUp(signupDto);
  }

  /**
   * Logs in a user.
   * @param {LogInDto} logInDto - The user data.
   * @param {Response} response
   * @return {Promise<ReturnDto>}
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(
    @Body() logInDto: LogInDto,
    @Res({passthrough: true}) response: Response,
  ): Promise<ReturnDto> {
    return await this.authService.logIn(logInDto, response);
  }
}
