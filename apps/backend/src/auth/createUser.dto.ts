import {IsNotEmpty, IsString} from 'class-validator';

/**
 * Data transfer object for creating a user
 */
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
    username: string;

  @IsString()
  @IsNotEmpty()
    fullName: string;

  @IsString()
  @IsNotEmpty()
    hashPassword: string;

  /**
   * Creates an instance of the CreateUserDto class.
   * @param {Partial<CreateUserDto>} dto - The data transfer object.
   */
  constructor(dto: Partial<CreateUserDto>) {
    Object.assign(this, dto);
  }
}
