import React, {useState} from 'react';
import {CourseDTO} from '@team8/types/dtos/course/course.dto';
import {Chip} from '@mui/material';

export interface CourseTreeProps {
  courses: CourseDTO[];
  onRemoveCourse?: (course: CourseDTO) => void | undefined;
}

interface CourseChipProps {
  course: CourseDTO;
  isSelected: boolean;
  isPrerequisite: boolean;
}

const courseTree = ({courses, onRemoveCourse = undefined}: CourseTreeProps) => {
  const [courseChips, setCourseChips] = useState<CourseChipProps[]>(
      courses.map((course: CourseDTO) => {
        return {
          course,
          isSelected: false,
          isPrerequisite: false,
        };
      }),
  );
  const toggleHightlightCourses = (
      selected: CourseDTO,
      prerequisite: CourseDTO[],
      hightlight = true,
  ) => {
    const cids = prerequisite.map((course) => course.cid);
    const newCourseChips = courseChips
        .map((courseChip) => {
          if (cids.includes(courseChip.course.cid)) {
            courseChip.isPrerequisite = hightlight;
          }
          return courseChip;
        })
        .map((courseChip) => {
          if (courseChip.course.cid === selected.cid) {
            courseChip.isSelected = hightlight;
          }
          return courseChip;
        });
    setCourseChips(newCourseChips);
  };

  return (
    <div>
      <h3>Recommended courses</h3>
      {courseChips.map(
          ({course, isSelected, isPrerequisite}: CourseChipProps) =>
          onRemoveCourse ? (
            <Chip
              label={`${course.courseName} ${course.courseNumber}`}
              color={
                isSelected ?
                  'primary' :
                  isPrerequisite ?
                  'secondary' :
                  'default'
              }
              key={course.cid}
              variant="filled"
              onMouseOver={() =>
                toggleHightlightCourses(course, course.prerequisites, true)
              }
              onMouseOut={() =>
                toggleHightlightCourses(course, course.prerequisites, false)
              }
              onDelete={() => {
                onRemoveCourse(course);
              }}
            />
          ) : (
            <Chip
              label={`${course.courseName} ${course.courseNumber}`}
              color={
                isSelected ?
                  'primary' :
                  isPrerequisite ?
                  'secondary' :
                  'default'
              }
              key={course.cid}
              variant="filled"
              onMouseOver={() =>
                toggleHightlightCourses(course, course.prerequisites, true)
              }
              onMouseOut={() =>
                toggleHightlightCourses(course, course.prerequisites, false)
              }
            />
          ),
      )}
    </div>
  );
};

export default courseTree;
