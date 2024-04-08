import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../entities/user.entity';
import {UserDTO} from '@team8/types/dtos/user/user.dto';
import {Section} from '../entities/section.entity';
import {SectionService} from '../sections/section.service';
import {TermService} from '../terms/term.service';
import {SectionDTO} from 'packages/types/dtos/section/section.dto';

@Injectable()
/**
 * Service responsible for managing user courses.
 */
export class UserCourseService {
  /**
   * Service responsible for managing user courses.
   * @param {Repository<User>} userRepository - The user repository.
   * @param {SectionService} sectionService - The section service.
   * @param {TermService} termService - The term service.
   */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly sectionService: SectionService,
    private readonly termService: TermService,
  ) {}

  /**
   * Retrieves all users.
   * @return {Promise<UserDTO[]>}
   */
  async findAll(): Promise<UserDTO[]> {
    return await this.userRepository.find();
  }

  /**
   * Retrieves a user by their UID (User ID).
   * @param {number} uid - The UID of the user.
   * @return {Promise<UserDTO>} A promise that resolves to a UserDTO object.
   */
  async find(uid: number): Promise<UserDTO> {
    return await this.userRepository.findOne({
      relations: {
        sections: true,
      },
      where: {
        uid: uid,
      },
    });
  }

  /**
   * Retrieves a section for a user by their UID (User ID) and TID (Term ID).
   * @param {number} uid - The UID of the user.
   * @param {number} tid - The TID of the term.
   * @return {Promise<Section[]>}
   * @throws {BadRequestException}
   * if the user does not exist or the section ID is invalid.
   */
  async findSection(uid: number, tid: number): Promise<Section[]> {
    const userSection = await this.userRepository.findOne({
      relations: {
        sections: {
          term: true,
          location: true,
          course: true,
        },
      },
      where: {
        uid: uid,
      },
    });

    if (!userSection) {
      throw new BadRequestException('User does not exist');
    }
    if (!userSection.sections) {
      throw new BadRequestException('Invalid Section ID');
    }
    return userSection.sections.filter(
        (SectionDTO: SectionDTO) => SectionDTO.term.tid == tid,
    );
  }

  /**
   * Retrieves active registrations for a user.
   * @param {number} uid - The UID of the user.
   * @param {number} tid - The TID of the term.
   * @return {Promise<any[]>}
   */
  async findActive(uid: number, tid: number): Promise<any[]> {
    const activeRegis = await this.findSection(uid, tid);
    let res = [];
    if (activeRegis) {
      const active = activeRegis.map((section: Section) => ({
        courseName: section.course.courseName,
        time: section.time,
        location: section.location.building + '' + section.location.roomNumber,
      }));

      res = active;
    }

    return res;
  }

  /**
   * Adds a completed course to a user's profile.
   * @param {number} uid - The UID of the user.
   * @param {number} sid - The SID (Section ID) of the completed course.
   * @return {Promise<void>} A promise that resolves when the course is added.
   */
  async addDoneCourse(uid: number, sid: number): Promise<void> {
    const user = await this.userRepository.findOne({
      relations: {
        doneSections: true,
      },
      where: {
        uid: uid,
      },
    });

    const section = await this.sectionService.find(sid);
    user.doneSections.push(section);
    await this.userRepository.save(user);
  }

  /**
   * Compares two time strings to check if they overlap.
   * @param {string} time1 - The first time string.
   * @param {string} time2 - The second time string being added.
   * @return {boolean} True if the time strings overlap, false otherwise.
   */
  compareDate(time1: string, time2: string): boolean {
    const array1 = time1.split(',');
    const array2 = time2.split(',');

    for (let i = 0; i < array1.length; i++) {
      for (let k = 0; k < array2.length; k++) {
        if (array2[k].charAt(0) === array1[i].charAt(0)) {
          const arr2First = parseFloat(
              array2[k].charAt(1) +
              array2[k].charAt(2) +
              '.' +
              array2[k].charAt(4) +
              array2[k].charAt(5),
          );

          const arr1First = parseFloat(
              array1[i].charAt(1) +
              array1[i].charAt(2) +
              '.' +
              array1[i].charAt(4) +
              array1[i].charAt(5),
          );

          const arr2Second = parseFloat(
              array2[k].charAt(7) +
              array2[k].charAt(8) +
              '.' +
              array2[k].charAt(10) +
              array2[k].charAt(11),
          );

          const arr1Second = parseFloat(
              array1[i].charAt(7) +
              array1[i].charAt(8) +
              '.' +
              array1[i].charAt(10) +
              array1[i].charAt(11),
          );

          if (arr2First < arr1Second) {
            if (arr2Second > arr1First || arr2First > arr1First) {
              throw new BadRequestException(
                  'Time overlapped with registered course',
              );
            }
          }
        }
      }
    }

    return true;
  }

  /**
   * Registers a user for a section.
   * @param {number} uid - The UID of the user.
   * @param {number} sid - The SID (Section ID) of the section to register.
   * @return {Promise<void>}
   * @throws {BadRequestException}
   * if the user is already registered in the section,
   * if the user has already registered the course in another section,
   * if the user has not completed all the prerequisites for the course,
   * or if the section ID is invalid or not for the current term.
   */
  async registerSection(uid: number, sid: number): Promise<void> {
    const user = await this.userRepository.findOne({
      relations: {
        sections: {
          course: true,
        },
        doneSections: {
          course: true,
        },
      },
      where: {
        uid: uid,
      },
    });

    const alreadyRegistered = user.sections.some(
        (section) => section.sid == sid,
    );

    if (alreadyRegistered) {
      throw new BadRequestException(
          'You have already registered in this section.',
      );
    }

    // Fetch section by ID
    const currentTerm = await this.termService.findCurrentTerm();
    const doneSec: Section[] = user.doneSections;
    const section = await this.sectionService.find(sid, {
      course: {
        prerequisites: true,
      },
    });
    if (!section) {
      throw new BadRequestException('Section ID does not exist');
    }
    const prerequisites = section.course.prerequisites;

    const courseRegistered = user.sections.some(
        (sec) => sec.course.cid == section.course.cid,
    );

    for (const sections of user.sections) {
      this.compareDate(sections.time, section.time);
    }

    if (courseRegistered) {
      throw new BadRequestException(
          'You have already registered this course in another section.',
      );
    }

    const prerequisitesCovered = prerequisites.every((prerequisite) =>
      doneSec.some((done) => done.course.cid === prerequisite.cid),
    );

    if (!prerequisitesCovered) {
      throw new BadRequestException(
          // eslint-disable-next-line max-len
          'User has not completed all the prerequisites to register this course.',
      );
    }

    if (!section || section.term.tid !== currentTerm) {
      throw new NotFoundException(
          // eslint-disable-next-line max-len
          'Invalid Section ID. Can only register the Current Term Sections (Fall 2024)',
      );
    }

    user.sections.push(section);

    // Save user with updated section to the database
    await this.userRepository.save(user);
  }

  /**
   * Deletes a user from a section.
   * @param {number} sid - The SID (Section ID) of the section.
   * @param {number} uid - The UID of the user.
   * @return {Promise<void>}
   */
  async deleteUserFromSection(sid: number, uid: number): Promise<void> {
    const user = await this.userRepository.findOne({
      relations: {
        sections: true,
      },
      where: {
        uid: uid,
      },
    });

    user.sections = user.sections.filter((s) => s.sid != sid);
    await this.userRepository.save(user);
  }
}
