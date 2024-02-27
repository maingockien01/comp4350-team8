import { Controller, Get, Post, Query } from "@nestjs/common";
import { CoursesService } from "./course.service";

@Controller()
export class CoursesController {
	constructor(readonly courseService: CoursesService) {}
	// Responsibility: handle API requests
	
}