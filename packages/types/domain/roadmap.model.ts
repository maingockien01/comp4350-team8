export class Roadmap {
    private cids: number[];

    constructor(private courses: HasPrerequisites[]) {
        this.cids = courses.map((course) => course.cid);    
    }

    isValid(): boolean {
        if (this.courses.length === 0) {
            return true;
        }

        return this.courses.every((course) => this.hasPrerequisites(course));
    }

    get recommendedCourses(): HasPrerequisites[] {
        return this.courses;
    }

    recommendCourses(...courses: HasPrerequisites[]) {
        for (const course of courses) {
            if (!this.hasPrerequisites(course)) {
                throw new RoadmapDoesNotContainPrerequisitesForCourseException(course);
            } 
            this.courses.push(course);
        }
    }

    private hasPrerequisites(course: HasPrerequisites): boolean {
        const prerequisites = course.prerequisites;
        if (prerequisites.length === 0) {
            return true;
        }

        //TODO: could be optimized with binary search?
        return prerequisites.every((prerequisite) => this.cids.includes(prerequisite.cid));
    }

}

export class RoadmapDoesNotContainPrerequisitesForCourseException extends Error {
    constructor(public course: HasPrerequisites) {
        super(`Roadmap does not contain prerequisites for course ${course.cid}`);
    }
}

export class InvalidRoadmapException extends Error {
    constructor() {
        super(`Roadmap is invalid`);
    }
}

export interface HasPrerequisites {
    cid: number;
    prerequisites: HasPrerequisites[];
}