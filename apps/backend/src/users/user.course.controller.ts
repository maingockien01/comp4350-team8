import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { UserCourseService } from './user.course.service';
import { UserDTO } from '@team8/types/dtos/user/user.dto';
import { SectionDTO } from '@team8/types/dtos/section/section.dto';
import { Section } from '../entities/section.entity';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class UserCourseController {
	static findActive(arg0: number, arg1: number): any {
		throw new Error('Method not implemented.');
	}
	constructor(readonly userService: UserCourseService) {}

	// Responsibility: handle API requests
	@Get()
	async findAll(): Promise<UserDTO[]> {
		return this.userService.findAll();
	}

	@Get('search')
	async findOne(@Query('uid') tid: number): Promise<UserDTO> {
		return this.userService.find(tid);
	}

	@Get('searchSection')
	async findSection(@Query('uid') uid: number, @Query('tid') tid: number): Promise<Section[]> {
		return this.userService.findSection(uid, tid);
	}

	@UseGuards(JWTAuthGuard)
	@Get('searchActive')
	async findActive(
		@Query('uid') uid: number,
		@Query('tid') tid: number,
		@Request() req,
	): Promise<SectionDTO[]> {
		console.log(req.user);
		return this.userService.findActive(uid, tid);
	}
}
