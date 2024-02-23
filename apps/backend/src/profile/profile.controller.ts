import { Body, Controller, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateDto } from './dto';

@Controller('profile')
export class ProfileController {
	constructor(private profileService: ProfileService) {}

	//TODO: Create update function for each field of user profile
	@Post()
	update(@Body() updateDto: UpdateDto) {
		return this.profileService.update(updateDto);
	}
}
