import { Injectable } from '@nestjs/common';
import { AuthDto } from '../dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
	idCount = 2;
	private users = [
		{
			userId: 1,
			username: 'john',
			password: 'changeme',
		},
		{
			userId: 2,
			username: 'maria',
			password: 'guess',
		},
	];

	async addOne(dto: AuthDto): Promise<User> {
		this.idCount = this.idCount + 1;
		let newUser = {
			userId: this.idCount,
			username: dto.username,
			password: dto.password,
		};
		this.users.push(newUser);
		return newUser;
	}

	async findOne(username: string): Promise<User | undefined> {
		return this.users.find((user) => user.username === username);
	}
}
