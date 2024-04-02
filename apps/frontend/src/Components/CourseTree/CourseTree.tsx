import React, {useState} from 'react';
import {CourseDTO} from '@team8/types/dtos/course/course.dto';
import {Chip, Grid} from '@mui/material';
import './CourseTree.css';

export interface CourseTreeProps {
  courses: CourseDTO[];
  onRemoveCourse?: (course: CourseDTO) => void | undefined;
}

interface CourseChipProps {
  course: CourseDTO;
  isSelected: boolean;
  isPrerequisite: boolean;
  label: string;
}

const courseTree = ({courses, onRemoveCourse = undefined}: CourseTreeProps) => {
  const [courseChips, setCourseChips] = useState<CourseChipProps[]>(
      courses.map((course: CourseDTO) => {
        return {
          course,
          isSelected: false,
          isPrerequisite: false,
          label: `${course.department.abbreviation} ${course.courseNumber}`,
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
      <Grid container spacing={1} className="course_tree--grid_container">
        {courseChips.map(
            ({course, isSelected, isPrerequisite, label}: CourseChipProps) =>
              (
                <Grid item xs="auto">
                  {onRemoveCourse ? (
                  <Chip
                    className="course_tree--chip"
                    label={label}
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
                      // eslint-disable-next-line max-len
                      toggleHightlightCourses(course, course.prerequisites, true)
                    }
                    onMouseOut={() =>
                      // eslint-disable-next-line max-len
                      toggleHightlightCourses(course, course.prerequisites, false)
                    }
                    onDelete={() => {
                      if (onRemoveCourse) {
                        onRemoveCourse(course);
                      }
                    }}
                  />
          ) : (
                  <Chip
                    className="course_tree--chip"
                    label={label}
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
                      // eslint-disable-next-line max-len
                      toggleHightlightCourses(course, course.prerequisites, true)
                    }
                    onMouseOut={() =>
                      // eslint-disable-next-line max-len
                      toggleHightlightCourses(course, course.prerequisites, false)
                    }
                  />
          )}
                </Grid>
              )
        )}
      </Grid>
    </div>
  );
};

export default courseTree;
