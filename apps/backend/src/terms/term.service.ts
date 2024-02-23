import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Term } from '../entities/term.entity';
import { Course } from '../entities/course.entity';

@Injectable()
export class TermService {
	constructor(
		@InjectRepository(Term)
		private readonly termRepository: Repository<Term>,
	) {}

	// Responsibility: handle business logic - make DB requests
	async findAll(): Promise<Term[]>{
		return await this.termRepository.find();
	}

	async find(tid: any, department: string): Promise<Course[]>{
		const termCourse = await this.termRepository.findOne({
			relations:{
				courses:true
			},
			where: {
				tid: tid
			}
		});
		
		return termCourse.courses.filter(Course => Course.department === department);
	}
}