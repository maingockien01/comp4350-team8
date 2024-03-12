import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateUserDto } from '@team8/types/dtos/profile/update.dto';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class ProfileController {
	constructor(private profileService: ProfileService) {}

	//TODO: Create update function for each field of user profile
	@UseGuards(JWTAuthGuard)
	@Post()
	update(@Body() updateDto: UpdateUserDto, @Request() req) {
		return this.profileService.updateUserInfo(req.user.uid, updateDto);
	}
}
