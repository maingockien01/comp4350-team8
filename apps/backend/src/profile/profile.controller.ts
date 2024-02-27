import { Body, Controller, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateDto } from '@team8/types/dtos/profile/update.dto';

@Controller()
export class ProfileController {
	constructor(private profileService: ProfileService) {}

	//TODO: Create update function for each field of user profile
	@Post()
	update(@Body() updateDto: UpdateDto) {
		return this.profileService.update(updateDto);
	}
}
