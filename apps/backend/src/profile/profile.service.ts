import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '@team8/types/dtos/profile/update.dto';

@Injectable()
export class ProfileService {
	constructor(private usersService: UsersService) {}

	async updateUserInfo(uid: number, dto: UpdateUserDto): Promise<any> {
		//TODO: Hash the password
		const user = await this.usersService.updateUserInfo(uid, dto);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
