import { Controller, Get, NotFoundException, Param, Post, Query } from "@nestjs/common";
import { DegreeService } from "./degree.service";
import { DegreeDTO } from "@team8/types/dtos/degree/degree.dto";
import { Degree } from "../entities/degree.entity";
import { FindOptionsRelations } from "typeorm";

@Controller()
export class DegreeController {
	constructor(readonly degreeService: DegreeService) {}
	// Responsibility: handle API requests
	
    @Get()
    async findAll(): Promise<DegreeDTO[]>{
        return this.degreeService.findAll();
    }

    @Get(':degreeId')
    async getDegreeById(
        @Param('degreeId') did: number,
        @Query('withRoadmap') withRoadmap: boolean = false,
    ): Promise<DegreeDTO> {
        
        const degrees = await this.degreeService.getDegrees({
            did,
        }, withRoadmap);

        if (degrees.length === 0) {
            throw new NotFoundException(`Degree with id ${did} not found`);
        }

        return degrees.at(0);
    }
}