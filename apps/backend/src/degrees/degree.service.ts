import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Degree } from '../entities/degree.entity';

@Injectable()
export class DegreeService {
	constructor(
		@InjectRepository(Degree)
		private readonly degreeRepository: Repository<Degree>,
	) {}
    
    async findAll(): Promise<Degree[]>{
        return this.degreeRepository.find();
    }
}