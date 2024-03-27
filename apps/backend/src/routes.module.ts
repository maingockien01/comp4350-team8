import {Module} from '@nestjs/common';
import {RouterModule} from '@nestjs/core';
import {TermModule} from './terms/term.module';
import {DegreeModule} from './degrees/degree.module';
import {UserCourseModule} from './users/user.course.module';
import {AuthModule} from './auth/auth.module';
import {ProfileModule} from './profile/profile.module';
import {RoadmapModule} from './roadmap/roadmap.module';
import {CourseModule} from './courses/course.module';
import {SectionModule} from './sections/section.module';
import {DepartmentModule} from './department/department.module';

@Module({
  imports: [
    TermModule,
    DegreeModule,
    UserCourseModule,
    AuthModule,
    CourseModule,
    RoadmapModule,
    SectionModule,
    DepartmentModule,
    RouterModule.register([
      {
        path: '/rest-api',
        children: [
          {
            path: '/auth',
            module: AuthModule,
          },
          {
            path: '/profile',
            module: ProfileModule,
          },
          {
            path: '/term',
            module: TermModule,
          },
          {
            path: '/degree',
            module: DegreeModule,
          },
          {
            path: '/user',
            module: UserCourseModule,
          },
          {
            path: '/course',
            module: CourseModule,
          },
          {
            path: '/section',
            module: SectionModule,
          },
          {
            path: '/roadmap',
            module: RoadmapModule,
          },
          {
            path: '/department',
            module: DepartmentModule,
          },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
/**
 * The RoutesModule class is a module for the application's routes.
 */
export class RoutesModule {}
