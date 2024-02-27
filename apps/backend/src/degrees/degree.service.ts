import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
import { Degree } from '../entities/degree.entity';
import { DegreeDTO } from '@team8/types/dtos/degree/degree.dto';

@Injectable()
export class DegreeService {
	constructor(
		@InjectRepository(Degree)
		private readonly degreeRepository: Repository<Degree>,
	) {}
    
    async findAll(): Promise<DegreeDTO[]>{
        return this.degreeRepository.find();
    }

	getDegrees(criterias: Partial<Degree>, withRecommendedCourses: boolean = false): Promise<Degree[]> {
		
		const relations: FindOptionsRelations<Degree> = {};
        if (withRecommendedCourses) {
            relations.recommendedCourses = {
                prerequisites: true
            }
        }

		return this.degreeRepository.find({
			where: {
				...criterias,
			},
			relations,
		});
	}
}