import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Term } from '../entities/term.entity';
import { CourseDTO } from '../courses/course.dto';
import { TermDTO } from "./term.dto";

@Injectable()
export class TermService {
	constructor(
		@InjectRepository(Term)
		private readonly termRepository: Repository<Term>,
	) {}

	// Responsibility: handle business logic - make DB requests
	async findAll(): Promise<TermDTO[]>{
		return await this.termRepository.find();
	}

	async findCurrentTerm():Promise<number>{
		const terms = await this.findAll();
		const maxTid = Math.max(...terms.map(term => term.tid));
		return maxTid;
	}

	async find(tid: any, department: string): Promise<CourseDTO[]>{
		const termCourse = await this.termRepository.findOne({
			relations:{
				courses:true
			},
			where: {
				tid: tid
			}
		});
		
		return termCourse.courses.filter(CourseDTO => CourseDTO.department === department);
	}
}