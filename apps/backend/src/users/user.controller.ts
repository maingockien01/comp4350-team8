import { Controller, Get, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDTO } from "./user.dto";
import { SectionDTO } from "../sections/section.dto";

@Controller()
export class UserController {
	constructor(readonly userService: UserService) {}
    
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