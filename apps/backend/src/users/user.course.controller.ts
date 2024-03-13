import { Controller, Get, Query, UseGuards, Request, Post, Delete } from '@nestjs/common';
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

	@UseGuards(JWTAuthGuard)
	@Get('search')
	async findOne(@Request() req): Promise<UserDTO> {
		return this.userService.find(req.user.uid);
	}

	@UseGuards(JWTAuthGuard)
	@Get('searchSection')
	async findSection(@Query('tid') tid: number, @Request() req): Promise<SectionDTO[]> {
		return this.userService.findSection(req.user.uid, tid);
	}

	@UseGuards(JWTAuthGuard)
	@Get('searchActive')
	async findActive(@Query('tid') tid: number, @Request() req): Promise<SectionDTO[]> {
		console.log(req.user);
		return this.userService.findActive(req.user.uid, tid);
	}

	@UseGuards(JWTAuthGuard)
	@Get('add')
	async addUserWithSection(@Query('sid') sid: number, @Request() req): Promise<void> {
		await this.userService.registerSection(req.user.uid, sid);
	}

	@UseGuards(JWTAuthGuard)
	@Get('remove')
	async removeUserFromSection(@Query('sid') sid: number, @Request() req): Promise<void> {
		await this.userService.deleteUserFromSection(sid, req.user.uid);
	}

	@Get('done')
	async addDoneSection(@Query('uid') uid: number, @Query('sid') sid: number): Promise<void> {
		await this.userService.addDoneCourse(uid, sid);
	}
}
