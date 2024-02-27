import { Controller, Get, Post, Query } from "@nestjs/common";
import { UserCourseService } from "./user.course.service";
import { UserDTO } from "@team8/types/dtos/user/user.dto";
import { SectionDTO } from "@team8/types/dtos/section/section.dto";

@Controller()
export class UserCourseController {
	constructor(readonly userService: UserCourseService) {}
    
	// Responsibility: handle API requests
	@Get()
	async findAll():Promise<UserDTO[]>{
		return this.userService.findAll();
	}

	@Get('search')
	async findOne(
		@Query('uid') tid: number,
	): Promise<UserDTO>{
		return this.userService.find(tid);
	}

	@Get('searchSection')
	async findSection(
		@Query('uid') uid: number,
		@Query('tid') tid:number,
	): Promise<SectionDTO[]>{
		return this.userService.findSection(uid, tid);
	}

	@Get('searchActive')
	async findActive(
		@Query('uid') uid: number,
		@Query('tid') tid:number,
	): Promise<SectionDTO[]>{
		return this.userService.findActive(uid, tid);
	}
}