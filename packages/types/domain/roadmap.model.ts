import {RoadmapDto} from '../dtos/roadmap/Roadmap.dto';
import {CourseDTO} from '../dtos/course/course.dto';

export class Roadmap {
  private cids: number[];

  constructor(public courses: CourseDTO[]) {
    this.cids = courses.map((course) => course.cid);
  }

  isValid(): boolean {
    if (this.courses.length === 0) {
      return true;
    }

    return this.courses.every((course) => this.hasPrerequisite(course));
  }

  get dto(): RoadmapDto {
    return {
      courses: this.courses,
    };
  }

  addCourse(...courses: CourseDTO[]): Roadmap {
    for (const course of courses) {
      if (this.courses.find((thisCourse) => thisCourse.cid === course.cid)) {
        throw new Error(`Roadmap already contain course`);
      }
      if (!this.hasPrerequisite(course)) {
        throw new RoadmapDoesNotContainPrerequisitesForCourseException(course);
      }
      this.courses.push(course);
    }

    return new Roadmap(this.courses);
  }

  removeCourse(course: CourseDTO): Roadmap {
    for (const thisCourse of this.courses) {
      if (thisCourse.prerequisites.map((v) => v.cid).includes(course.cid)) {
        throw new Error(
          `The course is reprequesite of ${thisCourse.department.abbreviation}-${thisCourse.courseNumber} ${thisCourse.courseName} in roadmap`,
        );
      }
    }

    const newCourses = this.courses.filter(
      (thisCourse) => thisCourse.cid !== course.cid,
    );
    return new Roadmap(newCourses);
  }

  private hasPrerequisite(course: CourseDTO): boolean {
    const prerequisites = course.prerequisites;
    if (!prerequisites || prerequisites.length === 0) {
      return true;
    }

    //TODO: could be optimized with binary search?
    return prerequisites.every((prerequisite) =>
      this.cids.includes(prerequisite.cid),
    );
  }
}

export class RoadmapDoesNotContainPrerequisitesForCourseException extends Error {
  constructor(public course: CourseDTO) {
    super(
      `Roadmap does not contain prerequisites for course ${course.department}-${course.courseNumber} ${course.courseName}`,
    );
  }
}

export class InvalidRoadmapException extends Error {
  constructor() {
    super(`Roadmap is invalid`);
  }
}
