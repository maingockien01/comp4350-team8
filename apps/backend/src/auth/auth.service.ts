import {
	Injectable,
} from '@nestjs/common';
import { LogInDto, LogInResDto } from '@team8/types/dtos/auth/login.dto';
import { SignUpDto } from '@team8/types/dtos/auth/signup.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async signUpOrFail(dto: SignUpDto): Promise<void> {
		const saltOrRounds = 10;
		const hashPassword = await bcrypt.hash(dto.password, saltOrRounds);
		await this.userRepository.insert({
			...dto,
			hashPassword,
		}); //Fail on user duplication
	}

	async logInOrFail(dto: LogInDto): Promise<LogInResDto> {
		const user = await this.userRepository.findOneByOrFail({ username: dto.username });

		await bcrypt.compare(dto.password, user.hashPassword); //Fail on wrong password

		const payload = { 
			sub: user.uid,
			username: user.username,
		}

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
