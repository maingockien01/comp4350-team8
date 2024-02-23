import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UpdateDto } from './dto';

@Injectable()
export class ProfileService {
	constructor(private usersService: UsersService) {}

	async update(dto: UpdateDto): Promise<any> {
		//TODO: Hash the password
		const user = await this.usersService.update(dto);
		return user;
	}
}
