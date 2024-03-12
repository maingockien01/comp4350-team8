import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from '../entities/section.entity';
import { SectionDTO } from '@team8/types/dtos/section/section.dto';

@Injectable()
export class SectionService {
	constructor(
		@InjectRepository(Section)
		private sectionRepository: Repository<Section>,
	) {}

	async find(sid: number): Promise<Section> {
		return await this.sectionRepository.findOne({
			relations: {
				term: true,
				course: true,
			},
			where: {
				sid: sid,
			},
		});
	}
}
