import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { compareCourses, Course } from "./model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "./action-types";
import { allCoursesLoaded, courseUpdated } from "./course.actions";

// export interface CoursesState {
//   entities: { [key: number]: Course };
//   ids: number[];
// }

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  // selectId: course => course.seqNo
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) =>
    adapter.setAll(action.courses, { ...state, allCoursesLoaded: true })
  ),
  on(CourseActions.courseUpdated, (state, action) =>
    adapter.updateOne(action.update, state)
  )
);

export const { selectAll } = adapter.getSelectors();
