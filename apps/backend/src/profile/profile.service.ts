import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '@team8/types/dtos/profile/update.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class ProfileService {
	constructor(private usersService: UsersService) {}

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
