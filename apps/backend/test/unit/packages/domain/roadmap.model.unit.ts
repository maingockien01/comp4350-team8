import {Roadmap} from '@team8/types/domain/roadmap.model';
import {CourseDTO} from '@team8/types/dtos/course/course.dto';

const course1: CourseDTO = {
  cid: 1,
  courseNumber: 4350,
  courseName: 'Software Engineering',
  department: {
    did: 1,
    name: 'Computer Science',
    abbreviation: 'CS',
  },
  prerequisites: [],
  description: 'This course is about software engineering',
  sections: [],
};

const course2: CourseDTO = {
  cid: 2,
  courseNumber: 4351,
  courseName: 'Software Engineering II',
  department: {
    did: 1,
    name: 'Computer Science',
    abbreviation: 'CS',
  },
  prerequisites: [course1],
  description: 'This course is about software engineering',
  sections: [],
};

describe('Roadmap Model', () => {
  it('should create an instance with empty array', () => {
    expect(new Roadmap([])).toBeTruthy();
  });

  describe('isValid', () => {
    it('should return true if no courses', () => {
      expect(new Roadmap([]).isValid()).toBe(true);
    });

    it('should return true if all courses have prerequisites', () => {
      const roadmap = new Roadmap([course1, course2]);

      expect(roadmap.isValid()).toBe(true);
    });

    it('should return false if any course does not have prerequisites', () => {
      const roadmap = new Roadmap([course2]);
      expect(roadmap.isValid()).toBe(false);
    });
  });

  describe('addCourse', () => {
    it('should add course to roadmap', () => {
      const roadmap = new Roadmap([course1]);
      expect(roadmap.addCourse(course2).courses).toEqual([course1, course2]);
    });

    it('should throw error if course already exists in roadmap', () => {
      const roadmap = new Roadmap([course1, course2]);
      expect(() => roadmap.addCourse(course2)).toThrowError(
        'Roadmap already contain course',
      );
    });

    it('should throw error if course does not have prerequisites', () => {
      const roadmap = new Roadmap([]);
      expect(() => roadmap.addCourse(course2)).toThrowError(
        'Roadmap does not contain prerequisites for course',
      );
    });
  });

  describe('removeCourse', () => {
    it('should remove course from roadmap', () => {
      const roadmap = new Roadmap([course1, course2]);
      expect(roadmap.removeCourse(course2).courses).toEqual([course1]);
    });

    it('should throw error if course is prerequisite of another course in roadmap', () => {
      const roadmap = new Roadmap([course1, course2]);
      expect(() => roadmap.removeCourse(course1)).toThrowError(
        'The course is reprequesite of CS-4351 Software Engineering II in roadmap',
      );
    });
  });
});
