import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDTO } from '@team8/types/dtos/user/user.dto';
import { SectionDTO } from '@team8/types/dtos/section/section.dto';
import { Section } from '../entities/section.entity';

@Injectable()
export class UserCourseService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async findAll(): Promise<UserDTO[]>{
		return await this.userRepository.find();
	}

	async find(uid: number): Promise<UserDTO>{
		return await this.userRepository.findOne({
			where: {
				uid: uid
			}
		});
	}

	async findSection(uid: number, tid: number): Promise<Section[]>{
		const userSection = await this.userRepository.findOne({
			relations:{
				sections:{
					term:true,
					location:true,
					course:true,
				},
			},
			where: {
				uid: uid
			}
		});

		
		return userSection.sections.filter(SectionDTO => SectionDTO.term.tid == tid );
	}

	async findActive(uid: number, tid: number): Promise<any[]>{
		const activeRegis = await this.findSection(uid,tid);
		let res = [];
		if (activeRegis){
			const active = (activeRegis).map((section) => ({
				"courseName": section.course.courseName,
				"time": section.time,
				"location": section.location.building + '' +section.location.roomNumber,
			}))

			res = active;
		}

		return res;
	}
}