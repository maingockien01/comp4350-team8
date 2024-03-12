import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '@team8/types/dtos/profile/update.dto';

@Injectable()
export class ProfileService {
	constructor(private usersService: UsersService) {}

	async updateUserInfo(uid: number, dto: UpdateUserDto): Promise<any> {
		//TODO: Hash the password
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
}
